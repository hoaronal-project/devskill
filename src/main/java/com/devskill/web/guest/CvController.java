package com.devskill.web.guest;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import com.devskill.model.PdfFileRequest;
import com.devskill.resources.ApplicationConfig;

@Controller
public class CvController {

    private final RestTemplate restTemplate;

    private final ApplicationConfig applicationConfig;

    @Autowired
    CvController(RestTemplate restTemplate, ApplicationConfig applicationConfig) {
        this.restTemplate = restTemplate;
        this.applicationConfig = applicationConfig;
    }

    @GetMapping({"/tai-cv/{idCV}"})
    public void downloadCV(@PathVariable String idCV, HttpServletResponse response) throws UnsupportedEncodingException {
        PdfFileRequest fileRequest = new PdfFileRequest();
        fileRequest.setFileName("code-complete.pdf");
        fileRequest.setSourceHtmlUrl("https://devskill.org/chi-tiet-cv/" + idCV);
        byte[] pdfFile = restTemplate.postForObject(applicationConfig.getPdfServiceUrl(),
          fileRequest, byte[].class);
        writePdfFileToResponse(pdfFile, fileRequest.getFileName(), response);
    }

    @GetMapping({"/xem-cv/{idCV}"})
    public String preview(@PathVariable String idCV) {
        return "guest/cv/cv-preview";
    }

    @GetMapping({"/chi-tiet-cv/{idCV}"})
    public String detail(@PathVariable String idCV) {
        return "guest/cv/cv-detail";
    }

    @GetMapping({"/tao-cv-online"})
    public String index() {
        return "guest/cv/create-cv";
    }

    private void writePdfFileToResponse(byte[] pdfFile, String fileName, HttpServletResponse response) throws UnsupportedEncodingException {
        String fileName1 = URLEncoder.encode(fileName, "UTF-8");
        fileName1 = URLDecoder.decode(fileName1, "ISO8859_1");
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName1 + "\"");
        try (InputStream in = new ByteArrayInputStream(pdfFile)) {
            OutputStream out = response.getOutputStream();
            IOUtils.copy(in, out);
            out.flush();
        } catch (IOException ex) {
            throw new RuntimeException("Error occurred when creating PDF file", ex);
        }
    }
}
