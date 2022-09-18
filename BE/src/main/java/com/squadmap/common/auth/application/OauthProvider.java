package com.squadmap.common.auth.application;

import com.squadmap.common.auth.application.dto.LoginMember;
import com.squadmap.common.properties.OauthProperties;

public interface OauthProvider {

    LoginMember oauth(String code, String state, OauthProperties.OauthProperty oauthProperty);

}
