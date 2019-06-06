package com.devskill.resources;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class ApplicationConfig {
	@Value("${spring.thymeleaf.cache}")
	private boolean thymeleafCache;

	@Value("${pdf.service.url}")
	private String pdfServiceUrl;
}
