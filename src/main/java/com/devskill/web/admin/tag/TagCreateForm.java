package com.devskill.web.admin.tag;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import org.springframework.beans.BeanUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import com.devskill.domain.Category;
import com.devskill.model.TagCreateRequest;


@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class TagCreateForm implements Serializable {

	@NotNull
	private String name;

	@NotNull
	private String language;

	public TagCreateRequest buildTagCreateRequest() {
		TagCreateRequest.Builder builder = new TagCreateRequest.Builder();
		return builder
				.name(name)
				.language(language)
				.build();
	}

	public static TagCreateForm fromDomainObject(Category category) {
		TagCreateForm form = new TagCreateForm();
		BeanUtils.copyProperties(category, form);
		return form;
	}
}
