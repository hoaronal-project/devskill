package com.devskill.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.util.StringUtils;

import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class TagSearchRequest implements Serializable {

	private String keyword;
	private String language;

	public TagSearchRequest() {
		this.language = LocaleContextHolder.getLocale().getLanguage();
	}

	public boolean isEmpty() {
		if (StringUtils.hasText(getKeyword())) {
			return false;
		}
		if (StringUtils.hasText(getLanguage())) {
			return false;
		}
		return true;
	}
	
	public static class Builder  {

		private String keyword;
		private String language;

		public Builder() {
		}

		public Builder keyword(String keyword) {
			this.keyword = keyword;
			return this;
		}

		public Builder language(String language) {
			this.language = language;
			return this;
		}

		public TagSearchRequest build() {
			TagSearchRequest request = new TagSearchRequest();
			request.keyword = keyword;
			request.language = language;
			return request;
		}
	}
}
