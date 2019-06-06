package com.devskill.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.util.StringUtils;

import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class CustomFieldSearchRequest implements Serializable {

    private String keyword;
    private String language;

    public boolean isEmpty() {
        if (StringUtils.hasText(getKeyword())) {
            return false;
        }
        if (StringUtils.hasText(getLanguage())) {
            return false;
        }
        return true;
    }
}
