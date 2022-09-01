package com.squadmap.member.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squadmap.member.application.dto.MemberInfo;
import com.squadmap.member.application.dto.naver.NaverRequest;
import com.squadmap.member.application.dto.naver.NaverToken;
import com.squadmap.member.application.dto.naver.NaverUserInfo;
import com.squadmap.member.application.dto.naver.NaverUserProfileResponse;
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

@RequiredArgsConstructor
@Component
public class NaverProvider implements OauthProvider {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    @Override
    public MemberInfo oauth(String code, String state, OauthProperty oauthProperty) {
        NaverToken naverToken = null;
        NaverUserInfo naverUserInfo = null;
        try {
            naverToken = accessNaver(code, state, oauthProperty);
            naverUserInfo = getUserInfo(naverToken, oauthProperty);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException();
        }

        return new MemberInfo(naverUserInfo.getNickname(), naverUserInfo.getProfileImage());
    }

    private NaverToken accessNaver(String code, String state, OauthProperty oauthProperty) throws IOException, InterruptedException {
        URI uri = URI.create(oauthProperty.getAccessTokenUri());

        NaverRequest naverRequest = new NaverRequest(oauthProperty.getClientId(),
                oauthProperty.getClientSecret(),
                "",
                code,
                state);

        String request = objectMapper.writeValueAsString(naverRequest);
        HttpRequest.BodyPublisher bodyPublisher = HttpRequest.BodyPublishers.ofString(request, StandardCharsets.UTF_8);

        HttpRequest httpRequest = HttpRequest.newBuilder(uri)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .POST(bodyPublisher)
                .build();

        HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        return objectMapper.readValue(httpResponse.body(), NaverToken.class);

    }

    private NaverUserInfo getUserInfo(NaverToken naverToken, OauthProperty oauthProperty) throws IOException, InterruptedException {
        URI uri = URI.create(oauthProperty.getUserInfoUri());

        HttpRequest httpRequest = HttpRequest.newBuilder(uri)
                .header(HttpHeaders.AUTHORIZATION, naverToken.toAuthorizationHeader())
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .GET()
                .build();

        HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        NaverUserProfileResponse naverUserProfileResponse = objectMapper.readValue(httpResponse.body(), NaverUserProfileResponse.class);

        return naverUserProfileResponse.getResponse();
    }

}
