package com.squadmap.core.access;

public class MemberContext {

    private static final ThreadLocal<CurrentAuthority> CONTEXT = new ThreadLocal<>();

    public static CurrentAuthority getCurrentAuthority() {
        return MemberContext.CONTEXT.get();
    }

    public static AuthorityLevel getAuthorityLevel() {
        return MemberContext.getCurrentAuthority().getAuthorityLevel();
    }

    public static void setContext(CurrentAuthority currentAuthority) {
        CONTEXT.set(currentAuthority);
    }

    public static void removeContext() {
        CONTEXT.remove();
    }

}
