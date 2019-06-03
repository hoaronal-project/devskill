package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.*;

import javax.persistence.CascadeType;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.*;

@Data
@Entity
@ToString
@EqualsAndHashCode
@NamedEntityGraphs({
		@NamedEntityGraph(name = Post.SHALLOW_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("cover"),
						@NamedAttributeNode("author")}
		),
		@NamedEntityGraph(name = Post.DEEP_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("cover"),
						@NamedAttributeNode("author")})
})
@Table(name = "post", uniqueConstraints = @UniqueConstraint(columnNames = {"code", "language"}))
@Inheritance(strategy = InheritanceType.JOINED)
@DynamicInsert
@DynamicUpdate
public class Post extends DomainObject<Long> {

	public static final String SHALLOW_GRAPH_NAME = "POST_SHALLOW_GRAPH";
	public static final String DEEP_GRAPH_NAME = "POST_DEEP_GRAPH";

	public enum Status {
		DRAFT, SCHEDULED, PUBLISHED
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 200)
	private String code;

	@Column(length = 3, nullable = false)
	private String language;

	@Column(length = 200)
	private String title;

	@ManyToOne
	private Media cover;

	@Lob
	private String body;

	@Embedded
	private Seo seo = new Seo();

	private LocalDateTime date;

	@ManyToOne
	private User author;

	@Enumerated(EnumType.STRING)
	@Column(length = 50, nullable = false)
	private Status status;

	@Column(nullable = false)
	private long views;

	@ManyToOne
	private Post drafted;

	@Column(length = 200)
	private String draftedCode;

	@ManyToMany
	@JoinTable(
			name = "post_category",
			joinColumns = {@JoinColumn(name = "post_id")},
			inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
	@SortNatural
	private SortedSet<Category> categories = new TreeSet<>();

	@ManyToMany
	@JoinTable(
			name = "post_tag",
			joinColumns = {@JoinColumn(name = "post_id")},
			inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
	@SortNatural
	private SortedSet<Tag> tags = new TreeSet<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@SortNatural
	private SortedSet<CustomFieldValue> customFieldValues = new TreeSet<>();

	@OneToMany(mappedBy = "drafted", cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.EXTRA)
	@SortNatural
	private SortedSet<Post> drafts;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.EXTRA)
	@SortNatural
	private SortedSet<Comment> comments;

	@ManyToMany
	@JoinTable(
			name = "post_related_post",
			joinColumns = {@JoinColumn(name = "post_id")},
			inverseJoinColumns = {@JoinColumn(name = "related_id")})
	private Set<Post> relatedToPosts = new HashSet<>();

	@ManyToMany
	@JoinTable(
			name = "post_related_post",
			joinColumns = {@JoinColumn(name = "related_id")},
			inverseJoinColumns = {@JoinColumn(name = "post_id")})
	private Set<Post> relatedByPosts = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "post_media", joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "media_id", referencedColumnName = "id"))
	@OrderColumn(name = "`index`")
	private List<Media> medias;

	/*@Transient
	private String imageLink;*/

	public Post() {
	}

	public Post(String title, String language, Status status,String code, long views, String createdAt, String updatedAt, String body) {
		this.title = title;
		this.language = language;
		this.status = status;
		this.views = views;
		this.body = body;
		this.code = code;
	}

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public String print() {
		return getTitle();
	}
}
