package com.devskill.model;

import com.devskill.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.util.List;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchRequest implements Serializable {
	private String keyword;
	private List<User.Role> roles;

	public boolean isEmpty() {
		if (StringUtils.hasText(getKeyword())) {
			return false;
		}
		if (!CollectionUtils.isEmpty(getRoles())) {
			return false;
		}
		return true;
	}
}
