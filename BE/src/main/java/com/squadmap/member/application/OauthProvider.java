package com.squadmap.member.application;

import com.squadmap.member.application.dto.MemberInfo;
import com.squadmap.member.application.properties.OauthProperties;

public interface OauthProvider {

    MemberInfo oauth(String code, String state, OauthProperties.OauthProperty oauthProperty);

}
