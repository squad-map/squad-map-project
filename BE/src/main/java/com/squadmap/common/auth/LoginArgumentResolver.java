package com.squadmap.common.auth;

import com.squadmap.common.auth.application.JwtProvider;
import com.squadmap.common.auth.application.OauthService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class LoginArgumentResolver implements HandlerMethodArgumentResolver {
    private static final String AUTH_TOKEN = "AUTH_TOKEN";
    private final JwtProvider jwtProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Login.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String token = (String) Optional.ofNullable(request.getAttribute(AUTH_TOKEN))
                .orElseThrow(RuntimeException::new);

        return Long.parseLong(jwtProvider.getAudience(token));
    }
}