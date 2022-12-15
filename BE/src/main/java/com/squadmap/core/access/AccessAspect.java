package com.squadmap.core.access;

import com.squadmap.core.group.application.GroupMemberService;

import com.squadmap.core.group.domain.PermissionLevel;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
@RequiredArgsConstructor
public class AccessAspect {

    private final GroupMemberService groupMemberService;

    @Before("@annotation(com.squadmap.core.access.RequiredPermission)")
    public void validatePermissionLevel(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        RequiredPermission requiredPermission = signature.getMethod().getAnnotation(RequiredPermission.class);
        Method method = signature.getMethod();
        Object[] args = joinPoint.getArgs();
        PermissionLevel permissionLevel = requiredPermission.requiredLevel();
        String[] parameterNames = signature.getParameterNames();
        Class[] parameterTypes = signature.getParameterTypes();

        if (permissionLevel.equals(PermissionLevel.READ)) {
            //groupMemberRepository.existsByMapIdAndMemberId()
        }
    }



}
