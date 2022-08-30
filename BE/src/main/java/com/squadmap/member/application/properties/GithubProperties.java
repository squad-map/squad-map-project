package com.squadmap.member.application.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "github")
@ConstructorBinding
@RequiredArgsConstructor
@Getter
public class GithubProperties {

    private final String clientId;
    private final String clientSecret;
    private final String accessTokenUrl;
    private final String userInfoUrl;

}
