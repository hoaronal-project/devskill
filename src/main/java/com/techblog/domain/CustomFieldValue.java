package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@ToString
@EqualsAndHashCode
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"post_id", "custom_field_id"}))
@DynamicInsert
@DynamicUpdate
public class CustomFieldValue extends DomainObject<Long> implements Comparable<CustomFieldValue> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "custom_field_id")
	private CustomField customField;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	private Post post;

	@Column(length = 300)
	private String stringValue;

	@Column
	private Long numberValue;

	@Column
	@Lob
	private String textValue;

	@Column
	private LocalDate dateValue;

	@Column
	private LocalDateTime datetimeValue;

	public Object getValue() {
		switch (getCustomField().getFieldType()) {
			case TEXT:
			case SELECTBOX:
			case RADIO:
				return getStringValue();
			case TEXTAREA:
			case HTML:
			case CHECKBOX:
				return getTextValue();
			case DATE:
				return getDateValue();
			case DATETIME:
				return getDatetimeValue();
			case NUMBER:
				return getNumberValue();
			default:
				return null;
		}
	}

	public boolean isEmpty() {
		switch (getCustomField().getFieldType()) {
			case TEXT:
			case SELECTBOX:
			case RADIO:
				if (StringUtils.isEmpty(getStringValue())) {
					return true;
				}
				return false;
			case TEXTAREA:
			case HTML:
			case CHECKBOX:
				if (StringUtils.isEmpty(getTextValue())) {
					return true;
				}
				return false;
			case DATE:
				if (getDateValue() == null) {
					return true;
				}
				return false;
			case DATETIME:
				if (getDatetimeValue() == null) {
					return true;
				}
				return false;
			case NUMBER:
				if (getNumberValue() == null) {
					return true;
				}
				return false;
			default:
				return true;
		}
	}

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public String print() {
		return this.getClass().getName() + " " + getId();
	}

	@Override
	public int compareTo(CustomFieldValue customFieldValue) {
		if (getId() == 0) {
			return 1;
		}
		int fieldDiff = getCustomField().compareTo(customFieldValue.getCustomField());
		if (fieldDiff != 0) {
			return fieldDiff;
		}
		return Long.compare(getId(), customFieldValue.getId());
	}
}
