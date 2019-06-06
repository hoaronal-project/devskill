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
public class UserDeleteRequest implements Serializable {
    private Long id;

    public static class Builder {

        private Long id;

        public Builder() {
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public UserDeleteRequest build() {
            UserDeleteRequest request = new UserDeleteRequest();
            request.id = id;
            return request;
        }
    }
}
