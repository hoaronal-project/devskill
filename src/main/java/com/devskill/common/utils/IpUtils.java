package com.devskill.common.utils;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Pattern;

public class IpUtils {

    public static String getClientIP(HttpServletRequest request) {
        if (request == null) {
            return null;
        }
        String xff = request.getHeader("X-Forwarded-For");
        String ip = getClientIPFromXFF(xff);
        if (ip != null) {
            return ip;
        }
        ip = request.getHeader("Proxy-Client-IP");
        if (isValidIP(ip)) {
            return ip;
        }
        ip = request.getHeader("WL-Proxy-Client-IP");
        if (isValidIP(ip)) {
            return ip;
        }
        ip = request.getRemoteAddr();
        return ip;
    }

    private static String getClientIPFromXFF(String xff) {
        if ((xff == null) || (xff.length() == 0)) {
            return null;
        }
        String[] ss = xff.split(",");
        for (String ip : ss) {
            ip = ip.trim();
            if (isValidIP(ip)) {
                return ip;
            }
        }
        return null;
    }

    private static final Pattern ipPattern = Pattern.compile("([0-9]{1,3}\\.){3}[0-9]{1,3}");

    private static boolean isValidIP(String ip) {
        if ((ip == null) || (ip.length() == 0) || "unknown".equalsIgnoreCase(ip)) {
            return false;
        }
        return ipPattern.matcher(ip).matches();
    }

}
