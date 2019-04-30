package com.techblog.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class PageCreateRequest implements Serializable {

	private String code;
	private String coverId;
	private String title;
	private String body;
	private Long authorId;
	private LocalDateTime date;
	private Long parentId;
	private Set<Long> categoryIds = new HashSet<>();
	private String tags;
	private Set<Long> relatedPostIds = new HashSet<>();
	private String seoTitle;
	private String seoDescription;
	private String seoKeywords;
	private String language;

	public static class Builder  {

		private String code;
		private String coverId;
		private String title;
		private String body;
		private Long authorId;
		private LocalDateTime date;
		private Long parentId;
		private Set<Long> categoryIds = new HashSet<>();
		private String tags;
		private Set<Long> relatedPostIds = new HashSet<>();
		private String seoTitle;
		private String seoDescription;
		private String seoKeywords;
		private String language;

		public Builder() {
		}

		public Builder code(String code) {
			this.code = code;
			return this;
		}

		public Builder coverId(String coverId) {
			this.coverId = coverId;
			return this;
		}

		public Builder title(String title) {
			this.title = title;
			return this;
		}

		public Builder body(String body) {
			this.body = body;
			return this;
		}

		public Builder authorId(Long authorId) {
			this.authorId = authorId;
			return this;
		}

		public Builder date(LocalDateTime date) {
			this.date = date;
			return this;
		}

		public Builder parentId(Long parentId) {
			this.parentId = parentId;
			return this;
		}

		public Builder categoryIds(Set<Long> categoryIds) {
			this.categoryIds = categoryIds;
			return this;
		}

		public Builder tags(String tags) {
			this.tags = tags;
			return this;
		}

		public Builder relatedPostIds(Set<Long> relatedPostIds) {
			this.relatedPostIds = relatedPostIds;
			return this;
		}

		public Builder seoTitle(String seoTitle) {
			this.seoTitle = seoTitle;
			return this;
		}

		public Builder seoDescription(String seoDescription) {
			this.seoDescription = seoDescription;
			return this;
		}

		public Builder seoKeywords(String seoKeywords) {
			this.seoKeywords = seoKeywords;
			return this;
		}

		public Builder language(String language) {
			this.language = language;
			return this;
		}

		public PageCreateRequest build() {
			PageCreateRequest request = new PageCreateRequest();
			request.code = code;
			request.coverId = coverId;
			request.title = title;
			request.body = body;
			request.authorId = authorId;
			request.date = date;
			request.parentId = parentId;
			request.categoryIds = categoryIds;
			request.tags = tags;
			request.relatedPostIds = relatedPostIds;
			request.seoTitle = seoTitle;
			request.seoDescription = seoDescription;
			request.seoKeywords = seoKeywords;
			request.language = language;
			return request;
		}
	}
}
