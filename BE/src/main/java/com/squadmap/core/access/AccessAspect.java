package com.squadmap.core.access;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.application.GroupMemberService;

import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.group.domain.PermissionLevel;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@RequiredArgsConstructor
public class AccessAspect {

    private final GroupMemberService groupMemberService;

    @Before("@annotation(com.squadmap.core.access.RequiredPermission)")
    public void validatePermissionLevel(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        RequiredPermission requiredPermission = signature.getMethod().getAnnotation(RequiredPermission.class);
        PermissionLevel permissionLevel = requiredPermission.requiredLevel();
        Object[] args = joinPoint.getArgs();

        AccessInfo accessInfo = getAccessInfo(args);

        if (!groupMemberService.hasRequiredLevel(accessInfo, permissionLevel)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        };
    }

    private AccessInfo getAccessInfo(Object[] args) {
        return Arrays.stream(args)
                .filter(arg -> arg instanceof AccessInfo)
                .map(AccessInfo.class::cast)
                .findFirst()
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN));
    }



}
