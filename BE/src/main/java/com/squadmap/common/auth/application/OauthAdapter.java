package com.squadmap.common.auth.application;

import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.common.auth.properties.OauthProperties;
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
