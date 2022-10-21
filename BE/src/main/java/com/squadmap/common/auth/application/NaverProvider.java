package com.squadmap.common.auth.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squadmap.common.auth.application.dto.LoginMember;
import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.common.auth.application.dto.naver.NaverRequest;
import com.squadmap.common.auth.application.dto.naver.NaverToken;
import com.squadmap.common.auth.application.dto.naver.NaverUserInfo;
import com.squadmap.common.auth.application.dto.naver.NaverUserProfileResponse;
import com.squadmap.common.properties.OauthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component("naver")
public class NaverProvider implements OauthProvider {

    private static final String ACCESS_TOKEN_GRANT_TYPE = "authorization_code";

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    @Override
    public MemberInfo oauth(String code, String state, OauthProperties.OauthProperty oauthProperty) {

        NaverUserInfo naverUserInfo;
        try {
            NaverToken naverToken = accessNaver(code, state, oauthProperty);
            naverUserInfo = getUserInfo(naverToken, oauthProperty);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }

        return new MemberInfo(naverUserInfo.getNickname(), naverUserInfo.getProfileImage(), naverUserInfo.getEmail());
    }

    private NaverToken accessNaver(String code, String state, OauthProperties.OauthProperty oauthProperty) throws IOException, InterruptedException {
        NaverRequest naverRequest = new NaverRequest(ACCESS_TOKEN_GRANT_TYPE,
                oauthProperty.getClientId(),
                oauthProperty.getClientSecret(),
                code,
                state);

        String uriString = UriComponentsBuilder.fromUriString(oauthProperty.getAccessTokenUri())
                .queryParams(naverRequest.getQueryParams())
                .build()
                .toUriString();

        HttpRequest httpRequest = HttpRequest.newBuilder(URI.create(uriString))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .GET()
                .build();

        HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        return objectMapper.readValue(httpResponse.body(), NaverToken.class);

    }

    private NaverUserInfo getUserInfo(NaverToken naverToken, OauthProperties.OauthProperty oauthProperty) throws IOException, InterruptedException {
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
