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
public class UserInvitationDeleteRequest implements Serializable {

	private String token;

	public static class Builder  {

		private String token;

		public Builder() {
		}

		public Builder token(String token) {
			this.token = token;
			return this;
		}

		public UserInvitationDeleteRequest build() {
			UserInvitationDeleteRequest request = new UserInvitationDeleteRequest();
			request.token = token;
			return request;
		}
	}
}
