package com.techblog.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

public class DateUtils {
	
	public static final int SECOND = 1;
	public static final int MINUTE_SECOND = 60 * SECOND;
	public static final int HOUR_SECOND = 60 * MINUTE_SECOND;
	public static final int DAY_SECOND = 24 * HOUR_SECOND;
	public static final int WEEK_SECOND = 7 * DAY_SECOND;

	/** yyyy-MM-dd HH:mm:ss.SSS */
	public static final String YMD_HMSSS = "yyyy-MM-dd HH:mm:ss.SSS";
	/** yyyyMMddHHmmssSSS */
	public static final String YMDHMSSS = "yyyyMMddHHmmssSSS";
	/** yyyy-MM-dd HH:mm:ss */
	public static final String YMD_HMS = "yyyy-MM-dd HH:mm:ss";
	/** yyyy-MM-dd HH:mm */
	public static final String YMD_HM = "yyyy-MM-dd HH:mm";
	/** yyyyMMddHHmmss */
	public static final String YMDHMS = "yyyyMMddHHmmss";
	/** yyyy-MM-dd */
	public static final String YMD = "yyyy-MM-dd";
	/** HH:mm:ss */
	public static final String HMS = "HH:mm:ss";

	public static final String DEFAULT_REGEX = "yyyy-MM-dd";

	public static final String DEFAULT_REGEX_YYYYMMDD = "yyyyMMdd";

	public static final String DEFAULT_REGEX_YYYY_MM_DD_HH_MIN_SS = "yyyy-MM-dd HH:mm:ss";

	private static final EPNDateFormat DEFAULT_FORMAT = new EPNDateFormat(DEFAULT_REGEX);

	private static final EPNDateFormat DEFAULT_FORMAT_YYYY_MM_DD_HH_MIN_SS = new EPNDateFormat(
			DEFAULT_REGEX_YYYY_MM_DD_HH_MIN_SS);
	private static final EPNDateFormat DEFAULT_FORMAT_YYYYMMDD = new EPNDateFormat(DEFAULT_REGEX_YYYYMMDD);
	private static Map<String, EPNDateFormat> formatMap = new HashMap<String, EPNDateFormat>();
	static {
		formatMap.put(DEFAULT_REGEX, DEFAULT_FORMAT);
		formatMap.put(DEFAULT_REGEX_YYYY_MM_DD_HH_MIN_SS, DEFAULT_FORMAT_YYYY_MM_DD_HH_MIN_SS);
		formatMap.put(DEFAULT_REGEX_YYYYMMDD, DEFAULT_FORMAT_YYYYMMDD);
	}

	private DateUtils() {

	}

	public static String format(Date date) {
		return DEFAULT_FORMAT.format(date);
	}

	public static String format(Date date, String regex) {
		return getDateFormat(regex).format(date);
	}

	private static EPNDateFormat getDateFormat(String regex) {
		EPNDateFormat fmt = formatMap.get(regex);
		if (fmt == null) {
			fmt = new EPNDateFormat(regex);
			formatMap.put(regex, fmt);
		}
		return fmt;
	}

	public static Date parseByAll(String time) {
		Date stamp = null;
		if (time == null || "".equals(time))
			return null;
		Pattern p3 = Pattern.compile("\\b\\d{2}[.-]\\d{1,2}([.-]\\d{1,2}){0,1}\\b");
		if (p3.matcher(time).matches()) {
			time = (time.charAt(0) == '1' || time.charAt(0) == '0' ? "20" : "19") + time;
		}

		stamp = DateUtils.parse(time, "yyyy-MM-ddHH:mm:ss");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy-MM-dd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy.MM.dd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy-MM");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy.MM");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy-MM-dd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yy-MM-dd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy.MM.dd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy-MM.dd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy.MM-dd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyyMMdd");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy年MM月dd日");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyyMM");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy年MM月");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy");
		if (stamp == null)
			stamp = DateUtils.parse(time, "yyyy年");
		return stamp;
	}

	public static Date parse(String source) {
		try {
			return DEFAULT_FORMAT.parse(source);
		} catch (Exception e) {
			return null;
		}
	}

	public static Date parse(String source, String regex) {
		try {
			EPNDateFormat fmt = getDateFormat(regex);
			return fmt.parse(source);
		} catch (Exception e) {
			return null;
		}
	}

	public static Date getNowDate() {
		return new Date(System.currentTimeMillis());
	}

	public static String getNow() {
		return getNow(DEFAULT_REGEX);
	}

	public static String getNow(String regex) {
		return format(getNowDate(), regex);
	}

	public static String getCurrenDayBeginTime(Date date) {
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		ca.set(Calendar.HOUR_OF_DAY, 0);
		ca.set(Calendar.MINUTE, 0);
		ca.set(Calendar.SECOND, 0);
		return format(ca.getTime(), "yyyy-MM-dd HH:mm:ss");
	}

	public static String getCurrenDayEndTime(Date date) {
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		ca.set(Calendar.HOUR_OF_DAY, 23);
		ca.set(Calendar.MINUTE, 59);
		ca.set(Calendar.SECOND, 59);
		return format(ca.getTime(), "yyyy-MM-dd HH:mm:ss");
	}

}

class EPNDateFormat {
	private SimpleDateFormat instance;

	EPNDateFormat() {
		instance = new SimpleDateFormat(DateUtils.DEFAULT_REGEX);
		instance.setLenient(false);
	}

	EPNDateFormat(String regex) {
		instance = new SimpleDateFormat(regex);
		instance.setLenient(false);
	}

	synchronized String format(Date date) {
		if (date == null)
			return "";
		return instance.format(date);
	}

	synchronized Date parse(String source) throws ParseException {
		return instance.parse(source);
	}
}
