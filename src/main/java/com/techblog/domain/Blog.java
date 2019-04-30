package com.techblog.domain;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedEntityGraphs({
		@NamedEntityGraph(name = Blog.DEEP_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("languages")})
})
@Table(name = "blog")
@DynamicInsert
@DynamicUpdate
@Data
public class Blog extends DomainObject<Long> {

	public static final long DEFAULT_ID = 1;

	public static final String DEEP_GRAPH_NAME = "BLOG_DEEP_GRAPH";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 200, nullable = false, unique = true)
	private String code;

	@Column(length = 3, nullable = false)
	private String defaultLanguage;

	@Embedded
	private GoogleAnalytics googleAnalytics;

	@OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
	private Set<BlogLanguage> languages = new HashSet<>();

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public String print() {
		return null;
	}
}
