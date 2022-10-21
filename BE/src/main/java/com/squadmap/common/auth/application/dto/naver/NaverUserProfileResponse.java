package com.squadmap.common.auth.application.dto.naver;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class NaverUserProfileResponse {

    private NaverUserInfo response;
}
