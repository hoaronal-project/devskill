package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@ToString
@EqualsAndHashCode
@Table(name="navigation_item")
@Inheritance(strategy= InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type", discriminatorType=DiscriminatorType.STRING)
@DynamicInsert
@DynamicUpdate
public abstract class NavigationItem extends DomainObject<Long> {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@Column(nullable=false)
	private int sort;

	@Column(nullable=false)
	private String language;

	@ManyToOne
	private NavigationItem parent;

	@OneToMany(mappedBy="parent")
	private Set<NavigationItem> children;

	@Override
	public Long getId() {
		return id;
	}
}


