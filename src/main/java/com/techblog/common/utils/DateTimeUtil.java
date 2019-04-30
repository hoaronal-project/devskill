package com.techblog.common.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {
    static int MAX_VALID_YR = 9999;
    static int MIN_VALID_YR = 1800;

    public static boolean isLeapYear(int year) {
        return (((year % 4 == 0) &&
                (year % 100 != 0)) ||
                (year % 400 == 0));
    }

    public static boolean isValidDate(int d,
                               int m,
                               int y) {
        if (y > MAX_VALID_YR ||
                y < MIN_VALID_YR)
            return false;
        if (m < 1 || m > 12)
            return false;
        if (d < 1 || d > 31)
            return false;

        if (m == 2) {
            if (isLeapYear(y))
                return (d <= 29);
            else
                return (d <= 28);
        }
        if (m == 4 || m == 6 ||
                m == 9 || m == 11)
            return (d <= 30);

        return true;
    }

    /*public static void main(String[] args) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

        String dates = "2015/02/29";

        //Format examples
        LocalDate localDate = LocalDate.parse(dates, formatter);

        //default format
        System.out.println("Default format of LocalDate="+localDate);

        String now = "2015-02-29 10:30";

        DateTimeFormatter formatters = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        LocalDateTime dateTime = LocalDateTime.parse(now, formatters);
        System.out.println("Default format of LocalDateTime="+dateTime);

    }*/
}
