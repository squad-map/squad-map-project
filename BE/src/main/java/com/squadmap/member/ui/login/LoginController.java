package com.squadmap.member.ui.login;

import com.squadmap.member.application.LoginService;
import com.squadmap.member.application.dto.LoginInfo;
import com.squadmap.member.ui.login.dto.GithubLogin;
import com.squadmap.member.ui.login.dto.LoginResponse;
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
    public LoginResponse loginGithub(@PathVariable String provider, @RequestBody GithubLogin githubLogin) {

        LoginInfo login = loginService.login(provider, githubLogin.getCode(), githubLogin.getState());

        return new LoginResponse(login.getTokens().getAccessToken(), login.getTokens().getRefreshToken());
    }
}
