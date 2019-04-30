package com.techblog.web.support;

public enum ParamError {

    MISSING_USERNAME_AND_EMAIL("accountName", "Missing both user name and email address"),
    USER_NAME("userName", "Invalid user name"),
    EMAIL_ADDRESS("email", "Invalid email address"),
    PASSWORD("passwordHash", "Invalid password hash"),
    PHONE_NUMBER("phone", "Invalid phone number"),
    FIRST_NAME("firstName", "Invalid first name"),
    LAST_NAME("lastName", "Invalid last name"),
    APP_NAME("appName", "Invalid app name"),
    APP_DOMAIN("appDomain", "Invalid app domain"),
    SERVER_KEY("serverKey", "Invalid server key"),
    TOKEN_EXPIRE_DURATION("tokenExpireDuration", "Invalid token expiry duration"),
    REDIRECT_URL("redirectUrl", "Invalid redirect URL"),
    ROLE_NAME("roleName", "Invalid role name"),
    ROLE_DESC("roleDescription", "Invalid role description");

    private final String name;
    private final String desc;

    private ParamError(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    public String getName() {
        return name;
    }

    public String getDesc() {
        return desc;
    }
}
