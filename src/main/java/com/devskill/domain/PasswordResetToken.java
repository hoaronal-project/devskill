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
@Table(name = "password_reset_token")
@Inheritance(strategy = InheritanceType.JOINED)
@DynamicInsert
@DynamicUpdate
public class PasswordResetToken extends DomainObject<String> {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(length = 50)
    private String token;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User user;

    @Column(length = 200, nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime expiredAt;

    @Override
    public String getId() {
        return getToken();
    }

    @Override
    public String print() {
        return getEmail() + " " + getToken();
    }
}