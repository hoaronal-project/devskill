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
public class UserInvitationResendRequest implements Serializable {

	private String token;

	public static class Builder  {

		private String token;

		public Builder() {
		}

		public Builder token(String token) {
			this.token = token;
			return this;
		}

		public UserInvitationResendRequest build() {
			UserInvitationResendRequest request = new UserInvitationResendRequest();
			request.token = token;
			return request;
		}
	}
}
