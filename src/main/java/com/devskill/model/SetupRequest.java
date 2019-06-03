package com.devskill.model;


import com.devskill.domain.PersonalName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;


@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class SetupRequest implements Serializable {
	private String websiteTitle;
	private String defaultLanguage;
	private List<String> languages;
	private String mediaUrlPrefix;
	private String mediaPath;
	private String loginId;
	private String loginPassword;
	private PersonalName name;
	private String email;

	public static class Builder  {

		private String websiteTitle;
		private String defaultLanguage;
		private List<String> languages;
		private String loginId;
		private String loginPassword;
		private PersonalName name;
		private String email;

		public Builder() {
		}

		public Builder websiteTitle(String websiteTitle) {
			this.websiteTitle = websiteTitle;
			return this;
		}

		public Builder defaultLanguage(String defaultLanguage) {
			this.defaultLanguage = defaultLanguage;
			return this;
		}

		public Builder languages(List<String> languages) {
			this.languages = languages;
			return this;
		}

//		public Builder mediaUrlPrefix(String mediaUrlPrefix) {
//			this.mediaUrlPrefix = mediaUrlPrefix;
//			return this;
//		}
//
//		public Builder mediaPath(String mediaPath) {
//			this.mediaPath = mediaPath;
//			return this;
//		}

//		public Builder mailSmtpHost(String mailSmtpHost) {
//			this.mailSmtpHost = mailSmtpHost;
//			return this;
//		}
//
//		public Builder mailFrom(String mailFrom) {
//			this.mailFrom = mailFrom;
//			return this;
//		}

		public Builder loginId(String loginId) {
			this.loginId = loginId;
			return this;
		}

		public Builder loginPassword(String loginPassword) {
			this.loginPassword = loginPassword;
			return this;
		}

		public Builder name(PersonalName name) {
			this.name = name;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public SetupRequest build() {
			SetupRequest request = new SetupRequest();
			request.websiteTitle = websiteTitle;
			request.defaultLanguage = defaultLanguage;
			request.languages = languages;
//			request.mediaUrlPrefix = mediaUrlPrefix;
//			request.mediaPath = mediaPath;
//			request.mailSmtpHost = mailSmtpHost;
//			request.mailFrom = mailFrom;
			request.loginId = loginId;
			request.loginPassword = loginPassword;
			request.name = name;
			request.email = email;
			return request;
		}
	}
}
