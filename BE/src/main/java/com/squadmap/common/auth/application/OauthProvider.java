package com.squadmap.common.auth.application;

import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.common.auth.properties.OauthProperties;

public interface OauthProvider {

    MemberInfo oauth(String code, String state, OauthProperties.OauthProperty oauthProperty);

}
