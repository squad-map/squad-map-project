package com.squadmap.member.application;

import com.squadmap.member.application.dto.MemberInfo;

public interface OauthProvider {

    MemberInfo oauth(String code, String state,OauthProperty oauthProperty);

}
