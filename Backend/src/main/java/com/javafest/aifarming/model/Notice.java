package com.javafest.aifarming.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity(name = "Notice")
@Table(name = "notice")
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    private String title;
    private String description;
    private LocalDateTime localDateTime;

    @ManyToOne
    @JoinColumn(
            name = "notice_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "notice_foreign_key"
            )
    )
    private UserInfo userInfo;

    public Notice() {
    }
    public Notice(String title, String description, LocalDateTime localDateTime, UserInfo userInfo) {
        this.title = title;
        this.description = description;
        this.localDateTime = localDateTime;
        this.userInfo = userInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
