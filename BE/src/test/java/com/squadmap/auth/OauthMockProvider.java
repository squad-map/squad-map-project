package com.squadmap.auth;

import org.apache.http.HttpHeaders;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class OauthMockProvider {

    public static void setUpResponses() throws IOException {
        //github
        stubFor(post(urlEqualTo("/login/oauth/access_token"))
                .withRequestBody(equalToJson(getResource("mock-body/github_get_access_token_request_body.json")))
                .willReturn(jsonResponse(getResource("mock-body/github_get_access_token.json"),200)));
        stubFor(get(urlEqualTo("/user"))
                .withHeader(HttpHeaders.AUTHORIZATION, equalTo("bearer gho_fAohD4bQYFak0CccLxZYepg8ZdIRgN3yOWn"))
                .willReturn(jsonResponse(getResource("mock-body/github_get_user_info1.json"),200)));
        stubFor(get(urlEqualTo("/user/emails"))
                .withHeader(HttpHeaders.AUTHORIZATION, equalTo("bearer gho_fAohD4bQYFak0CccLxZYepg8ZdIRgN3yOWn"))
                .willReturn(jsonResponse(getResource("mock-body/github_get_emails.json"),200)));
        //naver
        stubFor(get(urlPathEqualTo("/oauth2.0/token"))
                .willReturn(jsonResponse(getResource("mock-body/naver_get_access_token.json"),200)));
        stubFor(get(urlEqualTo("/v1/nid/me"))
                .willReturn(jsonResponse(getResource("mock-body/naver_get_user_info.json"),200)));
    }

    private static String getResource(String path) throws IOException {
        InputStream resourceAsStream = OauthMockProvider.class.getClassLoader().getResourceAsStream(path);
        assert resourceAsStream != null;
        return new BufferedReader(new InputStreamReader(resourceAsStream, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining("\n"));
    }


}
