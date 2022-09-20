package com.squadmap.common;


import com.squadmap.common.auth.AuthExtractor;
import com.squadmap.common.auth.application.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final LoginService loginService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (isPreflightRequest(request)) {
            return true;
        }

        String token = AuthExtractor.extract(request);
        return loginService.isLoginUser(token);
    }

    private boolean isPreflightRequest(HttpServletRequest request) {
        return request.getMethod().equals(HttpMethod.OPTIONS.name());
    }


}
