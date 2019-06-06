package com.devskill.common.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUtils {

    public static boolean isEmpty(String str) {
        return str == null || "".equals(str);
    }

    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

    public static String toUpperCase(String instr) {
        return instr == null ? instr : instr.toUpperCase();
    }

    public static String toLowerCase(String instr) {
        return instr == null ? instr : instr.toLowerCase();
    }


    public static String toUpperCaseFirst(String str) {
        if (str == null)
            return null;
        if (str.length() == 0)
            return str;
        String pre = String.valueOf(str.charAt(0));
        return str.replaceFirst(pre, pre.toUpperCase());
    }

    public static String toLowerCaseFirst(String str) {
        if (str == null)
            return null;
        if (str.length() == 0)
            return str;
        String pre = String.valueOf(str.charAt(0));
        return str.replaceFirst(pre, pre.toLowerCase());
    }

    public static String trim(String str) {
        return str == null ? null : str.trim();
    }

    public static String nvl(String instr) {
        return nvl(instr, "");
    }

    public static String nvl(String instr, String defaultValue) {
        return instr == null || "".equals(instr) ? defaultValue : instr;
    }

    public static boolean equals(String str1, String str2) {
        if (str1 == null && str2 == null)
            return true;
        if (str1 != null && str1.equals(str2))
            return true;
        return false;
    }

    public static String apadLeft(double a, int b, int len) {
        return apadLeft(String.valueOf(a), String.valueOf(b), len);
    }

    public static String apadRight(double a, int b, int len) {
        return apadRight(String.valueOf(a), String.valueOf(b), len);
    }

    public static String apadLeft(String str, String str2, int len) {
        if (str == null || str.length() == len || str2 == null)
            return str;
        if (str.length() > len)
            return str.substring(str.length() - len, len);
        return apadpro(str, str2, len, true);
    }

    public static String apadRight(String str, String str2, int len) {
        if (str == null || str.length() == len || str2 == null)
            return str;
        if (str.length() > len)
            return str.substring(0, len);
        return apadpro(str, str2, len, false);
    }

    private static String apadpro(String a, String b, int len, boolean appendleft) {
        int f = len - a.length();
        for (int i = 0; i < f; i++) {
            a = appendleft == true ? b + a : a + b;
        }
        return a;
    }

    public static String clear(String str) {
        return clear(str, " ");
    }

    public static String clear(String str, String str2) {
        if (str == null)
            return str;
        if (str2 == null)
            return str;
        String reg = "(" + str2 + ")+";
        Pattern p = Pattern.compile(reg);
        while (p.matcher(str).find()) {
            str = str.replaceAll(reg, "");
        }
        return str;
    }

    public static String suojin(String str, int c, String sub) {
        if (isEmpty(str))
            return str;
        if (str.length() <= c)
            return str;
        sub = nvl(sub);
        c = c - sub.length();
        c = c > str.length() ? 0 : c;
        str = str.substring(0, c);
        return str + sub;
    }

    public static String suojin(String str, int length) {
        return suojin(str, length, "…");
    }

    public static String replaceOnce(String text, String searchString, String replacement) {
        return replace(text, searchString, replacement, 1);
    }

    public static String replace(String text, String searchString, String replacement) {
        return replace(text, searchString, replacement, -1);
    }

    public static String replace(String text, String searchString, String replacement, int max) {
        if (isEmpty(text) || isEmpty(searchString) || replacement == null || max == 0)
            return text;
        int start = 0;
        int end = text.indexOf(searchString, start);
        if (end == -1)
            return text;
        int replLength = searchString.length();
        int increase = replacement.length() - replLength;
        increase = increase >= 0 ? increase : 0;
        increase *= max >= 0 ? max <= 64 ? max : 64 : 16;
        StringBuffer buf = new StringBuffer(text.length() + increase);
        do {
            if (end == -1)
                break;
            buf.append(text.substring(start, end)).append(replacement);
            start = end + replLength;
            if (--max == 0)
                break;
            end = text.indexOf(searchString, start);
        } while (true);
        buf.append(text.substring(start));
        return buf.toString();
    }

    public static String covertStringToURL(String str) {
        try {
            String temp = Normalizer.normalize(str.trim(), Normalizer.Form.NFD);
            Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
            return pattern.matcher(temp).replaceAll("").toLowerCase()
              .replaceAll("[^\\p{L}\\p{Z}]", "")
              .replaceAll(" ", "-")
              .replaceAll("đ", "d");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }
}
