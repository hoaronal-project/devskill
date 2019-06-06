package com.devskill.service.email;

import java.util.HashMap;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import com.devskill.resources.ApplicationConfig;
import com.devskill.service.locale.LocaleService;

import javax.mail.internet.MimeMessage;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final JavaMailSender mailSender;
    private final ApplicationConfig applicationConfig;
    private final LocaleService localeService;

    private static final String TEMPLATE_REGISTER = "register/welcome";

    public static final String EMAIL_TEMPLATE_ENCODING = "UTF-8";

    @Override
    public boolean sendRegisterMail(String toAddress, String password) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("login_url", "https://devskill.org");
        params.put("product_name", "Devskill");
        params.put("sender_name", "Mr Hoa");
        params.put("account", toAddress);
        params.put("password", password);

        try {
            final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setSubject("Welcome new member.");
            message.setFrom("Devskill.org");
            message.setTo(toAddress);
            message.setText(getMailText(TEMPLATE_REGISTER, params), true );

            // Send email
            this.mailSender.send(mimeMessage);
            return true;
        } catch (Exception e) {
            log.error("Failed to send mail. to: {} password: {}", toAddress, password, e);
        }

        return false;
    }

    private String getMailText(String templateName, HashMap<String, Object> params) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(getEmailTemplateResolver());
        templateEngine.setTemplateEngineMessageSource(emailMessageSource());
        Context context = new Context(localeService.getLocale(), params);
        return templateEngine.process(templateName, context);
    }

    private ClassLoaderTemplateResolver getEmailTemplateResolver() {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setPrefix("/mail/");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding(EMAIL_TEMPLATE_ENCODING);
        templateResolver.setCacheable(applicationConfig.isThymeleafCache());
        return templateResolver;
    }

    public ResourceBundleMessageSource emailMessageSource() {
        final ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("mail/messages");
        return messageSource;
    }

}
