package com.squadmap.common.auth.application.dto.naver;

import lombok.Getter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;


@Getter
public class NaverRequest {

    private final MultiValueMap<String, String> queryParams;

    public NaverRequest(String grantType, String clientId, String clientSecret, String code, String state) {
        this.queryParams = new LinkedMultiValueMap<>();
        queryParams.add("grant_type", grantType);
        queryParams.add("client_id", clientId);
        queryParams.add("client_secret", clientSecret);
        queryParams.add("code", code);
        queryParams.add("state", state);
    }

}
