package com.techblog.model;

import com.techblog.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.util.CollectionUtils;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ArticleSearchRequest implements Serializable {

	private String keyword;
	private LocalDateTime dateFrom;
	private LocalDateTime dateTo;
	private Collection<Long> categoryIds;
	private Collection<String> categoryCodes;
	private Collection<Long> tagIds;
	private Collection<String> tagNames;
	private MultiValueMap<String, Object> customFields;
	private Long authorId;
	private Post.Status status;
	private String language;

	public boolean isEmpty() {
		if (StringUtils.hasText(getKeyword())) {
			return false;
		}
		if (getDateFrom() != null) {
			return false;
		}
		if (getDateTo() != null) {
			return false;
		}
		if (!CollectionUtils.isEmpty(getCategoryIds())) {
			return false;
		}
		if (!CollectionUtils.isEmpty(getTagNames())) {
			return false;
		}
		if (!CollectionUtils.isEmpty(getCustomFields())) {
			return false;
		}
		if (getAuthorId() != null) {
			return false;
		}
		if (getStatus() != null) {
			return false;
		}
		if (StringUtils.hasText(getLanguage())) {
			return false;
		}
		return true;
	}
}
