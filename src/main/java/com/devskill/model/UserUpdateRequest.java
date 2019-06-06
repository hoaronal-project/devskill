package com.devskill.model;

import com.devskill.domain.PersonalName;
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
public class UserUpdateRequest implements Serializable {

    private Long id;
    private String loginId;
    private PersonalName name;
    private String nickname;
    private String email;
    private String description;

    public static class Builder {

        private Long id;
        private String loginId;
        private PersonalName name;
        private String nickname;
        private String email;
        private String description;

        public Builder() {
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder loginId(String loginId) {
            this.loginId = loginId;
            return this;
        }

        public Builder name(PersonalName name) {
            this.name = name;
            return this;
        }

        public Builder nickname(String nickname) {
            this.nickname = nickname;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public UserUpdateRequest build() {
            UserUpdateRequest request = new UserUpdateRequest();
            request.id = id;
            request.loginId = loginId;
            request.name = name;
            request.nickname = nickname;
            request.email = email;
            request.description = description;
            return request;
        }
    }
}
