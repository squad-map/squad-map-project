package com.squadmap.member.config;

import com.squadmap.member.application.properties.GithubProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:properties/auth.yml")
@EnableConfigurationProperties(GithubProperties.class)
@RequiredArgsConstructor
public class GithubConfig {

    private final GithubProperties githubProperties;

}
