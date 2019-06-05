package com.devskill.service.email;

public interface MailService {

    boolean sendRegisterMail(String toAddress, String password);
}
