package com.squadmap.member.application.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;


@ConfigurationProperties(prefix = "jwt")
@ConstructorBinding
@RequiredArgsConstructor
@Getter
public class JwtProperties {

    private final String secretKey;
    private final Long accessExpireTime;
    private final Long refreshExpireTime;
    private final String accessTokenSubject;
    private final String refreshTokenSubject;
    private final String issuer;
    private final String tokenType;
}
