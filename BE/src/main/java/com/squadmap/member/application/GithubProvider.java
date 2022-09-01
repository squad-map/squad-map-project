package com.squadmap.member.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squadmap.member.application.dto.*;
import com.squadmap.member.application.dto.github.GithubRequest;
import com.squadmap.member.application.dto.github.GithubToken;
import com.squadmap.member.application.dto.github.GithubUserInfo;
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

import static java.net.http.HttpRequest.newBuilder;

@RequiredArgsConstructor
@Component
public class GithubProvider implements OauthProvider {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    @Override
    public MemberInfo oauth(String code, String state, OauthProperty oauthProperty) {

        GithubToken githubToken = null;
        GithubUserInfo githubUserInfo = null;
        try {
            githubToken = accessGithub(code, oauthProperty);
            githubUserInfo = getUserInfo(githubToken, oauthProperty);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return new MemberInfo(githubUserInfo.getLogin(), githubUserInfo.getAvatarUrl());
    }

    private GithubToken accessGithub(String code, OauthProperty oauthProperty) throws IOException, InterruptedException {
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

        return objectMapper.readValue(response.body(), GithubToken.class);
    }

    private GithubUserInfo getUserInfo(GithubToken githubToken, OauthProperty oauthProperty) throws IOException, InterruptedException {
        URI uri = URI.create(oauthProperty.getUserInfoUri());

        HttpRequest httpRequest = newBuilder(uri).GET()
                .header(HttpHeaders.AUTHORIZATION, githubToken.toAuthorizationHeader())
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        if (response.statusCode() != 200) {
            throw new IllegalArgumentException();
        }

        return objectMapper.readValue(response.body(), GithubUserInfo.class);
    }

}

