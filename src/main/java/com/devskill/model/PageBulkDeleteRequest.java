package com.devskill.model;

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
public class PageBulkDeleteRequest implements Serializable {

	private List<Long> ids;
	private String language;

	public static class Builder  {

		private List<Long> ids;
		private String language;

		public Builder() {
		}

		public Builder ids(List<Long> ids) {
			this.ids = ids;
			return this;
		}

		public Builder language(String language) {
			this.language = language;
			return this;
		}

		public PageBulkDeleteRequest build() {
			PageBulkDeleteRequest request = new PageBulkDeleteRequest();
			request.ids = ids;
			request.language = language;
			return request;
		}
	}
}
