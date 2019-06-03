package com.devskill.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;


@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class TagCreateRequest implements Serializable {
	private String name;
	private String language;

	public static class Builder  {

		private String name;
		private String language;

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder language(String language) {
			this.language = language;
			return this;
		}

		public TagCreateRequest build() {
			TagCreateRequest request = new TagCreateRequest();
			request.name = name;
			request.language = language;
			return request;
		}
	}
}
