package com.devskill.model;

import com.devskill.common.constant.Constants;
import com.devskill.validator.FieldMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Email;
import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@FieldMatch.List({
        @FieldMatch(first = "loginPassword", second = "reLoginPassword", message = "The password fields must match")
})
public class UserCreateForm implements Serializable {

    /*@Size(min = 6, message = "Tài khoản tối thiểu 6 kí tự!")
    private String loginId;

    @Size(min = 8, message = "Mật khẩu đăng nhập tối thiểu 8 kí tự!")
    private String loginPassword;

    private String reLoginPassword;*/

    @Email(regexp = Constants.Pattern.EMAIL_PATTERN, message = "Email không đúng định dạng!")
    private String email;
}