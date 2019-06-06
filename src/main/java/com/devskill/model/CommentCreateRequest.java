package com.devskill.model;

import com.devskill.domain.BlogLanguage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequest implements Serializable {

    private BlogLanguage blogLanguage;
    private long postId;
    private long authorId;
    private LocalDateTime date;
    private String content;
    private boolean approved;
}

