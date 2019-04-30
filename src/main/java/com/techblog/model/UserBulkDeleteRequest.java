package com.techblog.model;

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
public class UserBulkDeleteRequest implements Serializable {

	private List<Long> ids;

	public static class Builder  {

		private List<Long> ids;

		public Builder() {
		}

		public Builder ids(List<Long> ids) {
			this.ids = ids;
			return this;
		}

		public UserBulkDeleteRequest build() {
			UserBulkDeleteRequest request = new UserBulkDeleteRequest();
			request.ids = ids;
			return request;
		}
	}
}
