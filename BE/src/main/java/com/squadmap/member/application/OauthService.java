package com.squadmap.member.application;

import com.squadmap.member.application.dto.MemberInfo;
import com.squadmap.member.application.properties.OauthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OauthService {

    private final OauthProperties oauthProperties;
    private final OauthAdapter oauthAdapter;

    public MemberInfo oauth(String provider, String code, String state) {

        OauthProperties.OauthProperty oauthProperty = this.oauthProperties.getOauthProperty(provider);
        System.out.println("oauthProperty==null = " + oauthProperty==null);
        System.out.println(oauthProperty.getAccessTokenUri());
        return oauthAdapter.oauth(provider, oauthProperty, code, state);
    }
}
