package com.devskill.model;

import com.devskill.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class PostSearchRequest {

	private Collection<Long> postIds = new ArrayList<>();
	private Post.Status status = Post.Status.PUBLISHED;
	private String keyword;
	private Collection<String> categoryCodes = new ArrayList<>();
	private Collection<String> tagNames = new ArrayList<>();
	private LocalDateTime dateFrom;
	private LocalDateTime dateTo;
	private String language;


	public PostSearchRequest withPostIds(Long... postIds) {
		if (getPostIds() == null) {
			setPostIds(new ArrayList<Long>(postIds.length));
		}
		for (Long value : postIds) {
			getPostIds().add(value);
		}
		return this;
	}

	public PostSearchRequest withStatus(Post.Status status) {
		this.status = status;
		return this;
	}

	public PostSearchRequest withKeyword(String keyword) {
		this.keyword = keyword;
		return this;
	}

	public PostSearchRequest withCategoryCodes(String... categoryCodes) {
		if (getCategoryCodes() == null) {
			setCategoryCodes(new ArrayList<String>(categoryCodes.length));
		}
		for (String value : categoryCodes) {
			getCategoryCodes().add(value);
		}
		return this;
	}

	public PostSearchRequest withTagNames(String... tagNames) {
		if (getTagNames() == null) {
			setTagNames(new ArrayList<String>(tagNames.length));
		}
		for (String value : tagNames) {
			getTagNames().add(value);
		}
		return this;
	}

	public PostSearchRequest withDateFrom(LocalDateTime dateFrom) {
		this.dateFrom = dateFrom;
		return this;
	}

	public PostSearchRequest withDateTo(LocalDateTime dateTo) {
		this.dateTo = dateTo;
		return this;
	}

	public PostSearchRequest withLanguage(String language) {
		this.language = language;
		return this;
	}

	public PostSearchRequest(String language) {
		this.language = language;
	}
}
