package com.techblog.common.constant;

import java.util.ArrayList;
import java.util.List;

public class Constants {

    public static List<String> TAGS = new ArrayList<>();

    public class ResultCode {
        public static final int SUCCESS = 1;
        public static final int FAIL = 0;
    }

    public class Pattern {
        public static final String DATE_DEFAULT = "yyyy-MM-dd";

        public static final String EMAIL_PATTERN =
                "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    }

    public interface URL_REMOTE{
        static String URL_ADD_POST = "/private/post/add";
    }

    public interface INDEX{
        static String POST = "post";
    }
}
