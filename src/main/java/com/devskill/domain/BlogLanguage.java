package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@ToString
@EqualsAndHashCode
@Table(name = "blog_language", uniqueConstraints = @UniqueConstraint(columnNames = {"blog_id", "language"}))
@DynamicInsert
@DynamicUpdate
public class BlogLanguage extends DomainObject<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(optional = false)
    private Blog blog;

    @Column(length = 3, nullable = false)
    private String language;

    @Lob
    @Column(length = 300, nullable = false)
    private String title;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public String print() {
        return getBlog().getCode() + "-" + getLanguage();
    }

}
