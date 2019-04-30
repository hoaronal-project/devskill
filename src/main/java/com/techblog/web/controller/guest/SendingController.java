package com.techblog.web.controller.guest;

import org.springframework.stereotype.Controller;

@Controller
public class SendingController {
/*
    @Autowired
    private EmailService emailService;

    *//* Send HTML mail (simple) *//*
    @RequestMapping(value = "/sendMailSimple", method = GET)
    public String sendSimpleMail(
        @RequestParam("recipientName") final String recipientName,
        @RequestParam("recipientEmail") final String recipientEmail,
        final Locale locale)
        throws MessagingException {

        emailService.sendSimpleMail(recipientName, recipientEmail, locale);
        return "redirect:sent";

    }

    *//* Send HTML mail with attachment. *//*
    @RequestMapping(value = "/sendMailWithAttachment", method = GET)
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

    *//* Send HTML mail with inline image *//*
    @RequestMapping(value = "/sendMailWithInlineImage", method = GET)
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

    *//* Send editable HTML mail *//*
    @RequestMapping(value = "/sendEditableMail", method = GET)
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
    }*/
}
