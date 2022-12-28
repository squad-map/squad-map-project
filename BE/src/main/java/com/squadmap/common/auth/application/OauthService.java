package com.squadmap.common.auth.application;

import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.common.auth.properties.OauthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OauthService {

    private final OauthProperties oauthProperties;
    private final OauthAdapter oauthAdapter;

    public MemberInfo oauth(String provider, String code, String state) {

        OauthProperties.OauthProperty oauthProperty = this.oauthProperties.getOauthProperty(provider);
        return oauthAdapter.oauth(provider, oauthProperty, code, state);
    }


}
