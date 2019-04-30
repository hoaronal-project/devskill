package com.techblog.domain;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode
@Embeddable
public class PersonalName implements Serializable {

	private String firstName;

	private String lastName;

	public PersonalName() {}

	public PersonalName(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
