package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SortNatural;

import javax.persistence.*;
import java.util.SortedSet;
import java.util.TreeSet;

@Data
@Entity
@ToString
@EqualsAndHashCode
@Table(name = "tag", uniqueConstraints = @UniqueConstraint(columnNames = {"name", "language"}))
@DynamicInsert
@DynamicUpdate
public class Tag extends DomainObject<Long> implements Comparable<Tag> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 200, nullable = false)
	private String name;

	@Column(length = 3, nullable = false)
	private String language;

	@ManyToMany
	@JoinTable(
			name = "post_tag",
			joinColumns = {@JoinColumn(name = "tag_id")},
			inverseJoinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"))
	@SortNatural
	private SortedSet<Post> posts = new TreeSet<>();

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public String print() {
		return getName();
	}

	@Override
	public int compareTo(Tag tag) {
		return new CompareToBuilder()
				.append(getName(), tag.getName())
				.append(getId(), tag.getId())
				.toComparison();
	}
}
