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
public class SignupRequest implements Serializable {
	private String loginId;
	private String loginPassword;
	private PersonalName name;
	private String email;
}
