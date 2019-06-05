package com.devskill.service.locale;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.ServletRequest;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class LocaleServiceImpl implements LocaleService {
	private final ServletRequest request;

	@Override
	public Locale getLocale() {
		return request.getLocale();
	}
}
