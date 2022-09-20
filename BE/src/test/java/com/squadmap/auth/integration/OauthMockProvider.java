package com.squadmap.auth.integration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class OauthMockProvider {

    public static void setUpResponse() throws IOException {
        stubFor(post(urlEqualTo("url"))
                .willReturn(jsonResponse(getResource("path"),200)));
    }

    private static String getResource(String path) throws IOException {
        InputStream resourceAsStream = OauthMockProvider.class.getClassLoader().getResourceAsStream(path);
        assert resourceAsStream != null;
        return new BufferedReader(new InputStreamReader(resourceAsStream, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining("\n"));
    }


}
