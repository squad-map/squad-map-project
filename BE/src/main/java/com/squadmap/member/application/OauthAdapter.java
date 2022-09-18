package com.squadmap.member.application;

import com.squadmap.member.application.dto.MemberInfo;
import com.squadmap.member.config.properties.OauthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@RequiredArgsConstructor
@Component
public class OauthAdapter {

    private final Map<String, OauthProvider> oauthProviders;

    public MemberInfo oauth(String provider, OauthProperties.OauthProperty oauthProperty, String code, String state) {

        OauthProvider oauthProvider = oauthProviders.get(provider);
        return oauthProvider.oauth(code, state, oauthProperty);
    }
}
