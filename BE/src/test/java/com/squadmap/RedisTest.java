package com.squadmap;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Disabled
class RedisTest {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;


    @Test
    void addStrings() {

        redisTemplate.opsForValue().set("hi:redis", "hi");

        String v = (String) redisTemplate.opsForValue().get("hi:redis");

        assertThat(v).isEqualTo("hi");
    }
}
