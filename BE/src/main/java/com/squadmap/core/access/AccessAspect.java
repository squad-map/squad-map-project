package com.squadmap.core.access;

import com.squadmap.core.group.application.GroupMemberService;
import com.squadmap.core.group.infrastructure.GroupMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccessAspect {

    private final GroupMemberService groupMemberService;

    
}
