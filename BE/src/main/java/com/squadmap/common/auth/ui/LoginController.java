package com.squadmap.common.auth.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.auth.application.LoginService;
import com.squadmap.common.auth.application.dto.LoginInfo;
import com.squadmap.common.auth.ui.dto.AccessToken;
import com.squadmap.common.auth.ui.dto.LoginRequest;
import com.squadmap.common.auth.ui.dto.LoginResponse;
import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/{provider}")
    public CommonResponse<LoginResponse> login(@PathVariable String provider, @RequestBody @Valid LoginRequest loginRequest) {

        LoginInfo loginInfo = loginService.login(provider, loginRequest.getCode(), loginRequest.getState());
        LoginResponse loginResponse = new LoginResponse(loginInfo.getAccessToken(),
                loginInfo.getRefreshToken(),
                loginInfo.getMemberId(),
                loginInfo.getNickname(),
                loginInfo.getProfileImage());

        return CommonResponse.success(SuccessCode.LOGIN, loginResponse);
    }

    @GetMapping("")
    public CommonResponse<AccessToken> reissueAccessToken(@Login Long memberId) {

        return CommonResponse.success(SuccessCode.REISSUE_TOKEN,
                new AccessToken(loginService.reissueAccessToken(memberId)));
    }
}
