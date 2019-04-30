package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SortNatural;
import org.springframework.util.DigestUtils;

import javax.persistence.*;
import java.io.UnsupportedEncodingException;
import java.util.SortedSet;
import java.util.TreeSet;

@Data
@Entity
@ToString
@EqualsAndHashCode
@NamedEntityGraphs({
		@NamedEntityGraph(name = User.SHALLOW_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("roles")}
		),
		@NamedEntityGraph(name = User.DEEP_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("roles")})
})
@Table(name = "user")
@DynamicInsert
@DynamicUpdate
public class User extends DomainObject<Long> {

	public static final String SHALLOW_GRAPH_NAME = "USER_SHALLOW_GRAPH";
	public static final String DEEP_GRAPH_NAME = "USER_DEEP_GRAPH";

	public enum Role {
		ADMIN,
		EDITOR,
		AUTHOR,
		VIEWER,
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 100, nullable = false, unique = true)
	private String loginId;

	@Column(length = 500, nullable = false)
	private String loginPassword;

	@Embedded
	@AttributeOverrides({
			@AttributeOverride(name = "firstName", column = @Column(name = "name_first", length = 50, nullable = false)),
			@AttributeOverride(name = "lastName", column = @Column(name = "name_last", length = 50, nullable = false)),
	})
	private PersonalName name = new PersonalName();

	@Column(length = 500)
	private String nickname;

	@Column(length = 200, nullable = false, unique = true)
	private String email;

	@Lob
	@Column
	private String description;

	@ElementCollection
	@SortNatural
	@JoinTable(name = "user_role")
	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 20, nullable = false)
	private SortedSet<Role> roles = new TreeSet<>();

	@Override
	public Long getId() {
		return id;
	}

	public String getGravatarUrl(int size) throws UnsupportedEncodingException {
		String hash = DigestUtils.md5DigestAsHex(getEmail().getBytes("CP1252"));
		return String.format("https://secure.gravatar.com/avatar/%s?size=%d&d=mm", hash, size);
	}

	@Override
	public String print() {
		return (getName() != null) ? getName().toString() : "";
	}
}
