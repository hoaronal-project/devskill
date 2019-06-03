package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SortNatural;

import javax.persistence.*;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

@Data
@Entity
@ToString
@EqualsAndHashCode
@NamedEntityGraphs({
		@NamedEntityGraph(name = Category.SHALLOW_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("parent"),
						@NamedAttributeNode("children")}
		),
		@NamedEntityGraph(name = Category.DEEP_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("parent"),
						@NamedAttributeNode("children")})
})
@Table(name = "category", uniqueConstraints = @UniqueConstraint(columnNames = {"code", "language"}))
@DynamicInsert
@DynamicUpdate
public class Category extends DomainObject<Long> implements Comparable<Category> {

	public static final String SHALLOW_GRAPH_NAME = "CATEGORY_SHALLOW_GRAPH";
	public static final String DEEP_GRAPH_NAME = "CATEGORY_DEEP_GRAPH";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 200, nullable = false)
	private String code;

	@Column(length = 3, nullable = false)
	private String language;

	@Column(length = 200, nullable = false)
	private String name;

	@Lob
	private String description;

	@Column(nullable = false)
	private int lft;

	@Column(nullable = false)
	private int rgt;

	@ManyToOne
	private Category parent;

	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
	private List<Category> children;

	@ManyToMany
	@JoinTable(
			name = "post_category",
			joinColumns = {@JoinColumn(name = "category_id")},
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
	public String toString() {
		return getName();
	}

	@Override
	public int compareTo(Category category) {
		int lftDiff = getLft() - category.getLft();
		if (lftDiff != 0) {
			return lftDiff;
		}
		return (int) (category.getId() - getId());
	}
}
