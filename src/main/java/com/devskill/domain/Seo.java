package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;
import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode
@Embeddable
public class Seo implements Serializable {

	@Column(name = "seo_title", length = 500)
	private String title;

	@Column(name = "seo_description")
	@Lob
	private String description;

	@Column(name = "seo_keywords")
	@Lob
	private String keywords;
}
