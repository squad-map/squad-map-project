package com.squadmap.auth.integration;

import com.squadmap.common.auth.application.OauthService;
import com.squadmap.common.auth.application.dto.MemberInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;

@SpringBootTest
@AutoConfigureWireMock
class OauthServiceTest {

    @Autowired
    private OauthService oauthService;


    @Test
    void githubLoginTest() {
        String provider = "github";
        String code = "mock_authorization_code";

        MemberInfo oauth = oauthService.oauth(provider, code, null);

    }
}
