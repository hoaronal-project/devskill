package com.devskill.framework;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AopFactory {

    @Around("execution(@com.devskill.framework.Module * *(..)) && @annotation(module)")
    public Object logDuration(ProceedingJoinPoint joinPoint, Module module) throws Throwable {

        //capture the start time
        long startTime = System.currentTimeMillis();
        //execute the method and get the result
        Object result = joinPoint.proceed();

        //capture the end time
        long endTime = System.currentTimeMillis();

        //calculate the duration and print results
        long duration = endTime - startTime;
        System.out.println(module.value()+": "+duration+"ms"); //you should use a logger

        //return the result to the caller
        return result;
    }

}