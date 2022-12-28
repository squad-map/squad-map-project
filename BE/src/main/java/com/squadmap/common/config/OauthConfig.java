package com.squadmap.common.config;

import com.squadmap.common.auth.properties.OauthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@EnableConfigurationProperties(OauthProperties.class)
@PropertySource("classpath:properties/auth.yml")
@RequiredArgsConstructor
public class OauthConfig {

    private final OauthProperties oauthProperties;

}
