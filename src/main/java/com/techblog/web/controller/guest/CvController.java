package com.techblog.web.controller.guest;

import com.techblog.model.PdfFileRequest;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.Base64;
import java.util.zip.ZipFile;

@Controller
public class CvController {

    private final RestTemplate restTemplate;

    private final String pdfServiceUrl;

    @Autowired
    CvController(@Value("${pdf.service.url}") String pdfServiceUrl, RestTemplate restTemplate) {
        this.pdfServiceUrl = pdfServiceUrl;
        this.restTemplate = restTemplate;
    }

    @GetMapping({"/preview-cv/{idCV}"})
    public void get(HttpServletResponse response) throws UnsupportedEncodingException {

        PdfFileRequest fileRequest = new PdfFileRequest();
        fileRequest.setFileName("code-complete.pdf");
        fileRequest.setSourceHtmlUrl("https://code-complete.herokuapp.com/cv-preview");

        byte[] pdfFile = restTemplate.postForObject(pdfServiceUrl,
                fileRequest, byte[].class);
        writePdfFileToResponse(pdfFile, fileRequest.getFileName(), response);
    }

    @GetMapping({"/download-cv/{idCV}"})
    public void downloadCV(@PathVariable String idCV, HttpServletResponse response) throws UnsupportedEncodingException {

        PdfFileRequest fileRequest = new PdfFileRequest();
        fileRequest.setFileName("code-complete.pdf");
        fileRequest.setSourceHtmlUrl("https://code-complete.herokuapp.com/cv-preview");
        byte[] pdfFile = restTemplate.postForObject(pdfServiceUrl,
                fileRequest, byte[].class);
        writePdfFileToResponse(pdfFile, fileRequest.getFileName(), response);
    }

    @GetMapping({"/cv-preview"})
    public String preview() {
        return "guest/cv/green-blur";
    }

    @GetMapping({"/index"})
    public String index() {
        return "guest/cv/index";
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

    public static void main(String[] args) {
        try (InputStream fileInputStream = new ByteArrayInputStream(Base64.getDecoder().decode(""));
             Reader reader = new InputStreamReader(fileInputStream)) {

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
