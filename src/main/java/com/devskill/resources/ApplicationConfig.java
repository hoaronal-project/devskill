package com.devskill.resources;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class ApplicationConfig {
	/** Thymeleaf cache*/
	@Value("${spring.thymeleaf.cache}")
	private boolean thymeleafCache;
}
