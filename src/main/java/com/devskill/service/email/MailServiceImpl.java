package com.devskill.service.email;

import java.util.HashMap;

import com.devskill.resources.ApplicationConfig;
import com.devskill.service.locale.LocaleService;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final MailSender mailSender;
    private final ApplicationConfig applicationConfig;
    private final LocaleService localeService;

    private static final String TEMPLATE_REGISTER = "register/welcome";

    @Override
    public boolean sendRegisterMail(String toAddress, String password) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("login_url", "https://devskill.org");
        params.put("product_name", "Devskill");
        params.put("sender_name", "Mr Hoa");
        params.put("account", toAddress);
        params.put("password", password);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("Devskill.org");
            message.setTo(toAddress);
            message.setSubject("Welcome new member.");
            message.setText(getMailText(TEMPLATE_REGISTER, params));

            mailSender.send(message);

            return true;
        } catch (Exception e) {
            log.error("Failed to send mail. to: {} password: {}", toAddress, password, e);
        }

        return false;
    }

    private String getMailText(String templateName, HashMap<String, Object> params) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(getEmailTemplateResolver());

        Context context = new Context(localeService.getLocale(), params);
        return templateEngine.process(templateName, context);
    }

    private ClassLoaderTemplateResolver getEmailTemplateResolver() {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setTemplateMode("HTML5");
        templateResolver.setPrefix("templates/template/email/");
        templateResolver.setSuffix(".html");
        templateResolver.setCharacterEncoding("UTF-8");
        templateResolver.setCacheable(applicationConfig.isThymeleafCache());
        return templateResolver;
    }
}
