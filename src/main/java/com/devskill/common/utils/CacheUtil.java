package com.devskill.common.utils;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.cache.Cache;
import org.springframework.cache.support.SimpleValueWrapper;

import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

public class CacheUtil implements Cache {


    public CacheUtil(String name, com.google.common.cache.Cache<Object, Object> cache, boolean allowNullValues) {
        this.name = name;
        this.cache = cache;
        this.allowNullValues = allowNullValues;
    }



    private final com.google.common.cache.Cache<Object, Object> cache;

    private final String name;

    private final boolean allowNullValues;

    public boolean isAllowNullValues() {
        return allowNullValues;
    }

    @Override
    public Object getNativeCache() {
        return this.cache;
    }


    @Override
    public void put(Object key, Object value) {
        cache.put(key, value);
    }

    @Override
    public ValueWrapper putIfAbsent(Object o, Object o1) {
        return null;
    }

    @Override
    public void evict(Object key) {
        cache.invalidate(key);
    }

    @Override
    public void clear() {
        cache.invalidateAll();
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public ValueWrapper get(Object key) {
        Object Value = cache.getIfPresent(key);
        return (Value != null ? new SimpleValueWrapper(Value) : null);
    }

    @Override
    public <T> T get(Object key, Class<T> type) {
        return null;
    }

    @Override
    public <T> T get(Object o, Callable<T> callable) {
        return null;
    }




















    private LoadingCache<String, Integer> otpCache = CacheBuilder.newBuilder().
      expireAfterWrite(5, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
        public Integer load(String key) {
            return 0;
        }
    });

    public int generateOTP(String key){

        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        otpCache.put(key, otp);
        return otp;
    }

    public int getOtp(String key){
        try{
            return otpCache.get(key);
        }catch (Exception e){
            return 0;
        }
    }

    public void clearOTP(String key){
        otpCache.invalidate(key);
    }

}
