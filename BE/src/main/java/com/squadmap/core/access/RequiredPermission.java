package com.squadmap.core.access;

import com.squadmap.core.group.domain.PermissionLevel;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiredPermission {

    PermissionLevel level() default PermissionLevel.READ;
}

