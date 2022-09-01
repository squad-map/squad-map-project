package com.squadmap.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@RequiredArgsConstructor
@Component
public class OauthAdapter {

    private final Map<String, OauthProvider> oauthProviders;
}
