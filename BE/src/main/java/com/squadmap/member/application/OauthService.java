package com.squadmap.member.application;

import com.squadmap.member.application.properties.OauthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OauthService {

    private final OauthProperties oauthProperties;
}
