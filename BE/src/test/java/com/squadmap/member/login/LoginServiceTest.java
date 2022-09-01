package com.squadmap.member.login;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import static java.net.http.HttpRequest.*;
import static java.net.http.HttpResponse.BodyHandlers;

class LoginServiceTest {

    @Test
    void test() throws IOException, InterruptedException {

        URI uri = URI.create("https://github.com/login/oauth/access_token");
        HttpClient httpClient = HttpClient.newBuilder().build();

        GithubProperties githubProperties = new GithubProperties("",
                "",
                "");

        ObjectMapper objectMapper = new ObjectMapper();

        String value = objectMapper.writeValueAsString(githubProperties);

        System.out.println("value = " + value);

        BodyPublisher bodyPublisher = BodyPublishers.ofString(value, StandardCharsets.UTF_8);

        HttpRequest httpRequest = newBuilder().uri(uri)
                .header("Content-Type", "application/json;charset=UTF-8")
                .POST(bodyPublisher)
                .build();
        String contentType = HttpHeaders.CONTENT_TYPE;
        HttpResponse<String> send = httpClient.send(httpRequest, BodyHandlers.ofString());
        String body = send.body();

        int i = send.statusCode();
        System.out.println("i = " + i);
        System.out.println("body = " + body);

    }

    @Getter
    @AllArgsConstructor
    static class GithubProperties{

        private String client_id;
        private String client_secret;
        private String code;

    }
}
