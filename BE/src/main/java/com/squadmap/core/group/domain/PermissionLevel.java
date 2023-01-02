package com.squadmap.core.group.domain;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;

public enum PermissionLevel {

    HOST, MAINTAIN, READ;


    public void checkChangeable() {
        if (this.equals(PermissionLevel.HOST)) {
            throw new ClientException(ErrorStatusCodeAndMessage.HOST_IMMUTABLE);
        }
    }

}
