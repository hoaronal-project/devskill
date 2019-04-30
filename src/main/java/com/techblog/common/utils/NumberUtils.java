package com.techblog.common.utils;

import java.math.BigDecimal;
import java.util.Arrays;

public class NumberUtils {

	private NumberUtils() {
	}

	public static int parseInt(Object obj) {
		int value = 0;
		if (obj != null) {
			try {
				value = Integer.parseInt(obj.toString());
			} catch (Exception e) {
				value = 0;
			}
		}
		return value;
	}

	public static BigDecimal parseBigDecimal(Object obj) {
		BigDecimal value = BigDecimal.ZERO;
		if (obj != null) {
			try {
				value = new BigDecimal(obj.toString());
			} catch (Exception e) {
				value = BigDecimal.ZERO;
			}
		}
		return value;
	}

	public static int parseInt(String str){
		return parseInt(str ,0);
	}

	public static int parseInt(String str ,int defaultValue){
		try{
			defaultValue = Integer.parseInt(str);
		} catch(Exception e){}
		return defaultValue ;
	}

	public static double parseDbl(String str){
		return parseDbl(str ,0);
	}

	public static double parseDbl(String str ,double defaultValue){
		try{
			defaultValue = Double.parseDouble(str);
		} catch(Exception e){}
		return defaultValue ;
	}
	
	public static float parseFloat(String str) {
		return parseFloat(str, 0);
	}
	
	public static float parseFloat(String str ,float b) {
		try{
			return Float.parseFloat(str);
		}catch(Exception e){
			return b;
		}
	}

	public static long parseLong(String str) {
		return parseLong(str, 0l);
	}

	public static long parseLong(String str ,long defaultValue){
		try{
			defaultValue = Long.parseLong(str);
		} catch(Exception e){}
		return defaultValue ;
	}

	public static String sortString(String inputString)
	{
		char tempArray[] = inputString.toCharArray();
		Arrays.sort(tempArray);
		return new String(tempArray);
	}
}
