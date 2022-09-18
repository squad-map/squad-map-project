package com.squadmap.common.auth;

import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

public class AuthExtractor {

    private static final String TOKEN_TYPE_BEARER = "Bearer";

    public static String extract(HttpServletRequest request) {
        Enumeration<String> headers = request.getHeaders(HttpHeaders.AUTHORIZATION);

        while (headers.hasMoreElements()) {
            String value = headers.nextElement();
            if(isBearerType(value)) {
                return extractAuthHeader(value);
            }
        }
        return null;
    }

    private static String extractAuthHeader(String value) {
        return value.substring(TOKEN_TYPE_BEARER.length()).trim();
    }

    private static boolean isBearerType(String value) {
        return value.toLowerCase().startsWith(TOKEN_TYPE_BEARER.toLowerCase());
    }
}
