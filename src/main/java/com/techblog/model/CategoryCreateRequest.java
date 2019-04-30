package com.techblog.model;

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
public class CategoryCreateRequest implements Serializable {

	private Long parentId;
	private String code;
	private String name;
	private String description;
	private String language;

	public static class Builder  {

		private Long parentId;
		private String code;
		private String name;
		private String description;
		private String language;

		public Builder() {
		}

		public Builder parentId(Long parentId) {
			this.parentId = parentId;
			return this;
		}

		public Builder code(String code) {
			this.code = code;
			return this;
		}

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder description(String description) {
			this.description = description;
			return this;
		}

		public Builder language(String language) {
			this.language = language;
			return this;
		}

		public CategoryCreateRequest build() {
			CategoryCreateRequest request = new CategoryCreateRequest();
			request.parentId = parentId;
			request.code = code;
			request.name = name;
			request.description = description;
			request.language = language;
			return request;
		}
	}
}
