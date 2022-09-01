package com.squadmap.member.application.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
@ConfigurationProperties(prefix = "naver")
@RequiredArgsConstructor
@Getter
public class NaverProperties {

    private final String clientId;
    private final String clientSecret;
    private final String accessTokenUrl;
    private final String userInfoUrl;
}
