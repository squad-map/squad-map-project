package com.squadmap.common.auth.application;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.common.auth.application.dto.github.GithubEmail;
import com.squadmap.common.auth.application.dto.github.GithubRequest;
import com.squadmap.common.auth.application.dto.github.GithubToken;
import com.squadmap.common.auth.application.dto.github.GithubUserInfo;
import com.squadmap.common.auth.properties.OauthProperties;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static java.net.http.HttpRequest.newBuilder;

@RequiredArgsConstructor
@Component("github")
public class GithubProvider implements OauthProvider {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    @Override
    public MemberInfo oauth(String code, String state, OauthProperties.OauthProperty oauthProperty) {


        GithubUserInfo githubUserInfo = null;
        GithubEmail githubEmail = null;
        try {
            GithubToken githubToken = accessGithub(code, oauthProperty);
            githubUserInfo = getUserInfo(githubToken, oauthProperty);
            githubEmail = getUserEmail(githubToken, oauthProperty);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new ClientException(ErrorStatusCodeAndMessage.GITHUB_LOGIN_ERROR);
        }

        return new MemberInfo(githubUserInfo.getLogin(), githubUserInfo.getAvatarUrl(), githubEmail.getEmail());
    }

    private GithubToken accessGithub(String code, OauthProperties.OauthProperty oauthProperty) throws IOException, InterruptedException {
        URI uri = URI.create(oauthProperty.getAccessTokenUri());

        String value = objectMapper.writeValueAsString(new GithubRequest(oauthProperty.getClientId(), oauthProperty.getClientSecret(), code));

        HttpRequest.BodyPublisher bodyPublisher = HttpRequest.BodyPublishers.ofString(value, StandardCharsets.UTF_8);
        HttpRequest httpRequest = newBuilder().uri(uri)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .POST(bodyPublisher)
                .build();

        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        if (response.statusCode() != 200) {
            throw new IllegalArgumentException();
        }

        GithubToken githubToken;
        try {
            githubToken = objectMapper.readValue(response.body(), GithubToken.class);
        } catch (MismatchedInputException e) {
            e.printStackTrace();
            throw new ClientException(ErrorStatusCodeAndMessage.GITHUB_LOGIN_ERROR);
        }

        return githubToken;
    }

    private GithubUserInfo getUserInfo(GithubToken githubToken, OauthProperties.OauthProperty oauthProperty) throws IOException, InterruptedException {
        URI uri = URI.create(oauthProperty.getUserInfoUri().split(",")[0]);

        HttpRequest httpRequest = generateUserInfoRequest(githubToken, uri);
        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        if (response.statusCode() != 200) {
            throw new ClientException(ErrorStatusCodeAndMessage.GITHUB_LOGIN_ERROR);
        }

        return objectMapper.readValue(response.body(), GithubUserInfo.class);
    }

    private GithubEmail getUserEmail(GithubToken githubToken, OauthProperties.OauthProperty oauthProperty) throws IOException, InterruptedException {

        URI uri = URI.create(oauthProperty.getUserInfoUri().split(",")[1]);

        HttpRequest httpRequest = generateUserInfoRequest(githubToken, uri);
        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        if (response.statusCode() != 200) {
            throw new ClientException(ErrorStatusCodeAndMessage.GITHUB_LOGIN_ERROR);
        }
        List<GithubEmail> emails = objectMapper.readValue(response.body(), new TypeReference<>() {
        });

        return emails.get(0);
    }

    private HttpRequest generateUserInfoRequest(GithubToken githubToken, URI uri) throws IOException, InterruptedException {
        return newBuilder(uri).GET()
                .header(HttpHeaders.AUTHORIZATION, githubToken.toAuthorizationHeader())
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }


}

