package com.javafest.aifarming.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "UserAdvertisement")
@Table(name = "user_advertisement")
public class UserAdvertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    private Long price;
    private String title;
    private String description;
    private LocalDateTime localDateTime;

    @ManyToOne
    @JoinColumn(
            name = "user_advertisement_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "user_advertisements_foreign_key"
            )
    )
    private UserInfo userInfo;

    public UserAdvertisement() {
    }

    public UserAdvertisement(String title, String description, Long price, LocalDateTime localDateTime, UserInfo userInfo) {
        this.description = description;
        this.localDateTime = localDateTime;
        this.userInfo = userInfo;
        this.title = title;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setId(Long id) {
        this.id = id;
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
