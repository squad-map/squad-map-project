package com.squadmap.common.auth.ui;

import com.squadmap.common.auth.application.LoginService;
import com.squadmap.common.auth.application.dto.LoginInfo;
import com.squadmap.common.auth.ui.dto.LoginRequest;
import com.squadmap.common.auth.ui.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login/{provider}")
    public LoginResponse loginGithub(@PathVariable String provider, @RequestBody LoginRequest githubLogin) {

        LoginInfo login = loginService.login(provider, githubLogin.getCode(), githubLogin.getState());

        return new LoginResponse(login.getTokens().getAccessToken(), login.getTokens().getRefreshToken(), login.getNickname(), login.getProfileImage());
    }
}
