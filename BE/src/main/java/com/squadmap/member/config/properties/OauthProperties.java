package com.squadmap.member.config.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.util.HashMap;
import java.util.Map;

@ConfigurationProperties(prefix = "oauth")
@Getter
public class OauthProperties {

    private final Map<String, OauthProperty> oauth2 = new HashMap<>();

    public OauthProperty getOauthProperty(String key) {
        OauthProperty oauthProperty = oauth2.get(key);
        return oauthProperty;
    }

    @ConstructorBinding
    @RequiredArgsConstructor
    @Getter
    public static class OauthProperty {

        private final String clientId;
        private final String clientSecret;
        private final String accessTokenUri;
        private final String userInfoUri;

    }
}
