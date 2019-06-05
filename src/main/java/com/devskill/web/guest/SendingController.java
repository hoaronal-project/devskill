package com.devskill.web.guest;

import com.devskill.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.Locale;

/*
@Controller
public class SendingController {

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/sendMailSimple", method = RequestMethod.GET)
    public String sendSimpleMail(
        @RequestParam("recipientName") final String recipientName,
        @RequestParam("recipientEmail") final String recipientEmail,
        final Locale locale)
        throws MessagingException {

        emailService.sendSimpleMail(recipientName, recipientEmail, locale);
        return "redirect:sent";

    }

    @RequestMapping(value = "/sendMailWithAttachment", method = RequestMethod.GET)
    public String sendMailWithAttachment(
        @RequestParam("recipientName") final String recipientName,
        @RequestParam("recipientEmail") final String recipientEmail,
        @RequestParam("attachment") final MultipartFile attachment,
        final Locale locale)
        throws MessagingException, IOException {

        this.emailService.sendMailWithAttachment(
            recipientName, recipientEmail, attachment.getOriginalFilename(),
            attachment.getBytes(), attachment.getContentType(), locale);
        return "redirect:sent";

    }

    @RequestMapping(value = "/sendMailWithInlineImage", method = RequestMethod.GET)
    public String sendMailWithInline(
        @RequestParam("recipientName") final String recipientName,
        @RequestParam("recipientEmail") final String recipientEmail,
        @RequestParam("image") final MultipartFile image,
        final Locale locale)
        throws MessagingException, IOException {

        this.emailService.sendMailWithInline(
            recipientName, recipientEmail, image.getName(),
            image.getBytes(), image.getContentType(), locale);
        return "redirect:sent";

    }

    @RequestMapping(value = "/sendEditableMail", method = RequestMethod.GET)
    public String sendMailWithInline(
        @RequestParam("recipientName") final String recipientName,
        @RequestParam("recipientEmail") final String recipientEmail,
        @RequestParam("body") final String body,
        final Locale locale)
        throws MessagingException, IOException {

        this.emailService.sendEditableMail(
            recipientName, recipientEmail, body, locale);
        return "redirect:sent";

    }

    @RequestMapping(value = "/sent", method = RequestMethod.GET)
    public String sent() {
        return "sent";
    }
}
*/
