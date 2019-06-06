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
public class UserInvitationCreateRequest implements Serializable {

    private String invitees;
    private String message;

    public static class Builder {

        private String invitees;
        private String message;

        public Builder() {
        }

        public Builder invitees(String invitees) {
            this.invitees = invitees;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public UserInvitationCreateRequest build() {
            UserInvitationCreateRequest request = new UserInvitationCreateRequest();
            request.invitees = invitees;
            request.message = message;
            return request;
        }
    }
}
