package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Data
@Entity
@ToString
@EqualsAndHashCode
@DiscriminatorValue("page")
@DynamicInsert
@DynamicUpdate
public class NavigationItemPage extends NavigationItem {

    @OneToOne
    private Page page;

    @Override
    public String print() {
        return getPage().getTitle();
    }
}
