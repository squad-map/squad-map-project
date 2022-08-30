package com.squadmap.member.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squadmap.member.application.dto.GithubRequest;
import com.squadmap.member.application.dto.GithubToken;
import com.squadmap.member.application.dto.GithubUserInfo;
import com.squadmap.member.application.dto.Tokens;
import com.squadmap.member.application.properties.GithubProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import static java.net.http.HttpRequest.*;
import static java.net.http.HttpResponse.BodyHandlers;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final GithubProperties githubProperties;

    public Tokens loginByGithub(String code) {
        GithubToken githubToken = null;
        GithubUserInfo githubUserInfo = null;
        try {
            githubToken = accessGithub(code);
            githubUserInfo = getUserInfo(githubToken);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException();
        }

        return new Tokens("access token", "refresh Token");
    }

    private GithubToken accessGithub(String code) throws IOException, InterruptedException {
        URI uri = URI.create(githubProperties.getAccessTokenUrl());

        String value = objectMapper.writeValueAsString(new GithubRequest(githubProperties.getClientId(), githubProperties.getClientSecret(), code));

        BodyPublisher bodyPublisher = BodyPublishers.ofString(value, StandardCharsets.UTF_8);

        HttpRequest httpRequest = newBuilder().uri(uri)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .POST(bodyPublisher)
                .build();

        HttpResponse<String> response = httpClient.send(httpRequest, BodyHandlers.ofString(StandardCharsets.UTF_8));

        if (response.statusCode() != 200) {
            throw new IllegalArgumentException();
        };

        GithubToken githubToken = objectMapper.readValue(response.body(), GithubToken.class);
        return githubToken;
    }

    private GithubUserInfo getUserInfo(GithubToken githubToken) throws IOException, InterruptedException {
        URI uri = URI.create(githubProperties.getUserInfoUrl());

        HttpRequest httpRequest = newBuilder(uri).GET()
                .header(HttpHeaders.AUTHORIZATION, githubToken.toAuthorizationHeader())
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        HttpResponse<String> response = httpClient.send(httpRequest, BodyHandlers.ofString(StandardCharsets.UTF_8));

        if(response.statusCode() != 200) {
            throw new IllegalArgumentException();
        }

        return objectMapper.readValue(response.body(), GithubUserInfo.class);
    }

}
