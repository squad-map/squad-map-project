package com.squadmap.member.config;

import com.squadmap.member.application.properties.OauthProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConstructorBinding;
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
