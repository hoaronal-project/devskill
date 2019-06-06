package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@ToString
@EqualsAndHashCode
@Table(name = "user_invitation")
@DynamicInsert
@DynamicUpdate
public class UserInvitation extends DomainObject<String> {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 50)
    private String token;

    @Column(length = 500, nullable = false)
    private String email;

    @Lob
    private String message;

    @Column(nullable = false)
    private LocalDateTime expiredAt;

    @Column(nullable = false)
    private boolean accepted;

    private LocalDateTime acceptedAt;

    @Override
    public String getId() {
        return getToken();
    }

    @Override
    public String print() {
        return getEmail();
    }
}
