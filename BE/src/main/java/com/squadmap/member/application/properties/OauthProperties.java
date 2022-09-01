package com.squadmap.member.application.properties;

import com.squadmap.member.application.OauthProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.util.Map;

@ConstructorBinding
@ConfigurationProperties(prefix = "oauth")
@RequiredArgsConstructor
@Getter
public class OauthProperties {

    private final Map<String, OauthProperty> oauthProperties;

    public OauthProperty getOauthProperty(String key) {
        return oauthProperties.get(key);
    }

}
