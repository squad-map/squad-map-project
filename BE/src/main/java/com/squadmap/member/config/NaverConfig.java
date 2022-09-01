package com.squadmap.member.config;

import com.squadmap.member.application.properties.NaverProperties;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@EnableConfigurationProperties(NaverProperties.class)
@PropertySource("classpath:properties/auth.yml")
@RequiredArgsConstructor
@Getter
public class NaverConfig {

    private final NaverProperties naverProperties;
}
