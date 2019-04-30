package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Data
@Entity
@ToString
@EqualsAndHashCode
@DiscriminatorValue("category")
@DynamicInsert
@DynamicUpdate
public class NavigationItemCategory extends NavigationItem {

	@OneToOne
	private Category category;

	@Override
	public String print() {
		return getCategory().getName();
	}
}
