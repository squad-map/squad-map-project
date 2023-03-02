package com.squadmap.common.auth;


import com.squadmap.common.auth.application.LoginService;
import com.squadmap.core.access.CurrentAuthority;
import com.squadmap.core.access.MemberContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Component
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {
    private static final String AUTH_TOKEN = "AUTH_TOKEN";

    private final LoginService loginService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (isPreflightRequest(request)) {
            return true;
        }

        String token = AuthExtractor.extract(request);
        boolean isValidate = loginService.isLoginUser(token);
        request.setAttribute(AUTH_TOKEN, token);
        log.debug("token validation is {}", isValidate);
        return isValidate;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        MemberContext.removeContext();
    }

    private boolean isPreflightRequest(HttpServletRequest request) {
        return request.getMethod().equals(HttpMethod.OPTIONS.name());
    }


}
