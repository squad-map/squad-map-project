package com.squadmap.assured;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @PostMapping("/users")
    public TestResponse getTestResponse(@RequestBody TestRequest testRequest) {
        return TestResponse.from(testRequest);
    }

}
