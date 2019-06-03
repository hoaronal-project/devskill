package com.devskill.common.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ReflectionUtils {

	private static Method getDeclaredMethod(Object object, String methodName, Class<?>... parameterTypes) {
		Method method = null;
		Class<?> clazz = object.getClass();
		while (clazz != Object.class) {
			try {
				method = clazz.getDeclaredMethod(methodName, parameterTypes);
				return method;
			} catch (Exception e) {
				clazz = clazz.getSuperclass();
			}
		}
		return null;
	}

	public static Object invokeMethod(Object object, String methodName, Class<?>[] parameterTypes, Object[] parameters) {
		Method method = getDeclaredMethod(object, methodName, parameterTypes);

		if (method == null) {
			System.err.println(object.getClass() + "未获取到" + methodName + "方法!");
			return null;
		}

		method.setAccessible(true);

		try {
			if (null != method) {

				return method.invoke(object, parameters);
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}

		return null;
	}

	private static Field getDeclaredField(Object object, String fieldName) {
		Field field = null;

		Class<?> clazz = object.getClass();

		while (clazz != Object.class) {
			try {
				field = clazz.getDeclaredField(fieldName);
				return field;
			} catch (Exception e) {
				clazz = clazz.getSuperclass();
			}
		}

		return null;
	}

	public static void setFieldValue(Object object, String fieldName, Object value) {

		Field field = getDeclaredField(object, fieldName);

		if (field == null) {
			System.err.println(object.getClass() + "未获取到" + fieldName + "属性!");
			return;
		}

		field.setAccessible(true);

		try {
			field.set(object, value);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}

	}

	public static Object getFieldValue(Object object, String fieldName) {

		Field field = getDeclaredField(object, fieldName);

		if (field == null) {
			return null;
		}

		field.setAccessible(true);

		try {
			return field.get(object);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
