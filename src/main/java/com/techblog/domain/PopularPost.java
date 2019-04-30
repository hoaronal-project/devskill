package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@ToString
@EqualsAndHashCode
@Table(name = "popular_post", uniqueConstraints = @UniqueConstraint(columnNames = {"language", "type"}))
@DynamicInsert
@DynamicUpdate
public class PopularPost extends DomainObject<Long> implements Comparable<PopularPost> {

	public enum Type {
		DAILY,
		WEEKLY,
		MONTHLY,
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 3, nullable = false)
	private String language;

	@Enumerated(EnumType.STRING)
	@Column(length = 50, nullable = false)
	private Type type;

	@Column(nullable = false)
	private long views;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	private Post post;

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public String print() {
		return getType().toString();
	}

	@Override
	public int compareTo(PopularPost o) {
		return new CompareToBuilder()
				.append(getLanguage(), o.getLanguage())
				.append(getType(), o.getType())
				.append(getId(), o.getId())
				.toComparison();
	}
}
