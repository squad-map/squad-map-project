package com.squadmap.assured;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class TestResponse {

    private final Long id;
    private final String nickName;

    public static TestResponse from(TestRequest testRequest) {
        return new TestResponse(testRequest.getId(), testRequest.getNickName());
    }
}
