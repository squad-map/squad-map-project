package com.squadmap.member.ui.login;

import com.squadmap.member.application.LoginService;
import com.squadmap.member.ui.login.dto.GithubLogin;
import com.squadmap.member.ui.login.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login/github")
    public LoginResponse loginGithub(@RequestBody GithubLogin githubLogin) {

//        GithubToken githubToken = loginService.accessGithub(githubLogin.getCode());
//        System.out.println(githubLogin.getRedirectUri());
//        System.out.println(githubToken.getAccessToken());
        return new LoginResponse("access token", "refresh token");
    }
}
