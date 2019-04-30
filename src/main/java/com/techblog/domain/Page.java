package com.techblog.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@ToString
@EqualsAndHashCode
@NamedEntityGraphs({
	@NamedEntityGraph(name = Page.SHALLOW_GRAPH_NAME,
			attributeNodes = {
					@NamedAttributeNode("cover"),
					@NamedAttributeNode("author"),
					@NamedAttributeNode("parent"),
					@NamedAttributeNode("children"),
					@NamedAttributeNode("categories"),
					@NamedAttributeNode("tags")
			}
	),
	@NamedEntityGraph(name = Page.DEEP_GRAPH_NAME,
			attributeNodes = {
					@NamedAttributeNode("cover"),
					@NamedAttributeNode("author"),
					@NamedAttributeNode("parent"),
					@NamedAttributeNode("children"),
					@NamedAttributeNode("categories"),
					@NamedAttributeNode("tags"),
					@NamedAttributeNode("relatedToPosts"),
					@NamedAttributeNode(value = "customFieldValues", subgraph = "customFieldValue")},
			subgraphs =  {
					@NamedSubgraph(name = "customFieldValue",
							attributeNodes = {
									@NamedAttributeNode("customField")})})
})
@Table(name="page")
@DynamicInsert
@DynamicUpdate
public class Page extends Post implements Comparable<Page> {

	public static final String SHALLOW_GRAPH_NAME = "PAGE_SHALLOW_GRAPH";
	public static final String DEEP_GRAPH_NAME = "PAGE_DEEP_GRAPH";

	@Column(nullable=false)
	private int lft;

	@Column(nullable=false)
	private int rgt;

	@ManyToOne
	private Page parent;

	@OneToMany(mappedBy="parent", cascade=CascadeType.ALL)
	private List<Page> children;
	
	public int compareTo(Page page) {
		int lftDiff = getLft() - page.getLft();
		if (lftDiff != 0) {
			return lftDiff;
		}
		return (int) (page.getId() - getId());
	}
}
