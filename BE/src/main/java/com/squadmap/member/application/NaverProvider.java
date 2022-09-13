package com.squadmap.member.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squadmap.member.application.dto.MemberInfo;
import com.squadmap.member.application.dto.naver.NaverRequest;
import com.squadmap.member.application.dto.naver.NaverToken;
import com.squadmap.member.application.dto.naver.NaverUserInfo;
import com.squadmap.member.application.dto.naver.NaverUserProfileResponse;
import com.squadmap.member.application.properties.OauthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@RequiredArgsConstructor
@Component("naver")
public class NaverProvider implements OauthProvider {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    @Override
    public MemberInfo oauth(String code, String state, OauthProperties.OauthProperty oauthProperty) {
        NaverToken naverToken = null;
        NaverUserInfo naverUserInfo = null;
        try {
            naverToken = accessNaver(code, state, oauthProperty);
            naverUserInfo = getUserInfo(naverToken, oauthProperty);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }

        return new MemberInfo(naverUserInfo.getNickname(), naverUserInfo.getProfileImage());
    }

    private NaverToken accessNaver(String code, String state, OauthProperties.OauthProperty oauthProperty) throws IOException, InterruptedException {
        URI uri = URI.create(oauthProperty.getAccessTokenUri());
        NaverRequest naverRequest = new NaverRequest("authorization_code",
                oauthProperty.getClientId(),
                oauthProperty.getClientSecret(),
                code,
                state);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        params.put("grant_type", Collections.singletonList("authorization_code"));
        params.put("client_id", Collections.singletonList(oauthProperty.getClientId()));
        params.put("client_secret", Collections.singletonList(oauthProperty.getClientSecret()));
        params.put("code", Collections.singletonList(code));
        params.put("state", Collections.singletonList(state));
        String uriString = UriComponentsBuilder.fromUriString(oauthProperty.getAccessTokenUri()).queryParams(params).build().toUriString();

        URI uri1 = URI.create(uriString);


        String request = objectMapper.writeValueAsString(naverRequest);
        System.out.println("request = " + request);
        HttpRequest.BodyPublisher bodyPublisher = HttpRequest.BodyPublishers.ofString(request, StandardCharsets.UTF_8);

        HttpRequest httpRequest = HttpRequest.newBuilder(uri1)
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
