package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SortNatural;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

@Data
@Entity
@ToString
@EqualsAndHashCode
@NamedEntityGraphs({
		@NamedEntityGraph(name = CustomField.SHALLOW_GRAPH_NAME),
		@NamedEntityGraph(name = CustomField.DEEP_GRAPH_NAME,
				attributeNodes = {
						@NamedAttributeNode("options")})
})
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"code", "language"}))
@DynamicInsert
@DynamicUpdate
public class CustomField extends DomainObject<Long> implements Comparable<CustomField> {

	public static final String SHALLOW_GRAPH_NAME = "CUSTOM_FIELD_SHALLOW_GRAPH";
	public static final String DEEP_GRAPH_NAME = "CUSTOM_FIELD_DEEP_GRAPH";

	public static final String STRING_VALUE = "stringValue";
	public static final String TEXT_VALUE = "textValue";
	public static final String NUMBER_VALUE = "numberValue";
	public static final String DATE_VALUE = "dateValue";
	public static final String DATETIME_VALUE = "datetimeValue";

	public enum FieldType {
		UNDEFINED(null),
		TEXT(STRING_VALUE),
		TEXTAREA(TEXT_VALUE),
		HTML(TEXT_VALUE),
		SELECTBOX(STRING_VALUE),
		CHECKBOX(TEXT_VALUE),
		RADIO(STRING_VALUE),
		NUMBER(NUMBER_VALUE),
		DATE(DATE_VALUE),
		DATETIME(DATETIME_VALUE);

		private String valueType;

		FieldType(String valueType) {
			this.valueType = valueType;
		}

		public String getValueType() {
			return valueType;
		}
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column
	private Integer idx;

	@Column(length = 200)
	private String code;

	@Column(length = 200)
	private String name;

	@Lob
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(length = 50, nullable = false)
	private FieldType fieldType;

	@Column(length = 200)
	private String defaultValue;

	@Column(length = 3, nullable = false)
	private String language;

	@OneToMany(mappedBy = "customField", cascade = CascadeType.ALL)
	@SortNatural
	private SortedSet<CustomFieldValue> customFieldValues = new TreeSet<>();

	@ElementCollection(fetch=FetchType.LAZY)
	@JoinTable(name="custom_field_option", joinColumns=@JoinColumn(name="custom_field_id"))
	@OrderColumn(name="`idx`")
	private List<CustomFieldOption> options = new ArrayList<>();

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public String print() {
		return getName();
	}

	@Override
	public int compareTo(CustomField field) {
		return new CompareToBuilder()
				.append(getIdx(), field.getIdx())
				.append(getId(), field.getId())
				.toComparison();
	}
}