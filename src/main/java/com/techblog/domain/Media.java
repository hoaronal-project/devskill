package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@ToString
@EqualsAndHashCode
@Table(name = "media")
@DynamicInsert
@DynamicUpdate
public class Media extends DomainObject<String> {

	public enum ResizeMode {
		RESIZE,
		CROP,
	}

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid2")
	@Column(length = 50)
	private String id;

	@Column(length = 500, nullable = false)
	private String mimeType;

	@Column(length = 500)
	private String originalName;

	@ManyToMany(mappedBy = "medias")
	private List<Post> posts;

	@Override
	public String print() {
		return getId() + " " + getOriginalName();
	}
}
