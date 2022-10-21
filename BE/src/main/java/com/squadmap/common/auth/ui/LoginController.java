package com.squadmap.common.auth.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.auth.application.LoginService;
import com.squadmap.common.auth.application.dto.LoginInfo;
import com.squadmap.common.auth.ui.dto.AccessToken;
import com.squadmap.common.auth.ui.dto.LoginRequest;
import com.squadmap.common.auth.ui.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login/{provider}")
    public LoginResponse login(@PathVariable String provider, @RequestBody LoginRequest githubLogin) {

        LoginInfo loginInfo = loginService.login(provider, githubLogin.getCode(), githubLogin.getState());

        return new LoginResponse(loginInfo.getAccessToken(),
                loginInfo.getRefreshToken(),
                loginInfo.getMemberId(),
                loginInfo.getNickname(),
                loginInfo.getProfileImage());
    }

    @GetMapping("/login")
    public AccessToken reissueAccessToken(@Login Long memberId) {

        return new AccessToken(loginService.reissueAccessToken(memberId));
    }
}
