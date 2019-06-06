package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@ToString
@EqualsAndHashCode
@NamedEntityGraphs({
  @NamedEntityGraph(name = Comment.SHALLOW_GRAPH_NAME,
    attributeNodes = {
      @NamedAttributeNode("author")}
  ),
  @NamedEntityGraph(name = Comment.DEEP_GRAPH_NAME,
    attributeNodes = {
      @NamedAttributeNode("author")})
})
@Table(name = "comment")
@DynamicInsert
@DynamicUpdate
public class Comment extends DomainObject<Long> implements Comparable<Comment> {

    public static final String SHALLOW_GRAPH_NAME = "COMMENT_SHALLOW_GRAPH";
    public static final String DEEP_GRAPH_NAME = "COMMENT_DEEP_GRAPH";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    private User author;

    @Column(length = 200, nullable = false)
    private String authorName;

    @Column(nullable = false)
    private LocalDateTime date;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private boolean approved;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public String print() {
        return this.getClass().getName() + " " + getId();
    }

    public int compareTo(Comment comment) {
        return new CompareToBuilder()
          .append(getDate(), comment.getDate())
          .append(getId(), comment.getId())
          .toComparison();
    }
}
