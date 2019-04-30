package com.techblog.model;

import com.techblog.common.constant.Constants;
import com.techblog.validator.FieldMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.Size;
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

    @Size(min = 6, message = "Tài khoản tối thiểu 6 kí tự!")
    private String loginId;

    @Size(min = 8, message = "Mật khẩu đăng nhập tối thiểu 8 kí tự!")
    private String loginPassword;

    private String reLoginPassword;

    @Email(regexp = Constants.EMAIL_PATTERN, message = "Email không đúng định dạng!")
    private String email;
}