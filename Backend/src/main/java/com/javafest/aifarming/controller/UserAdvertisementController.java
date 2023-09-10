package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.UserAdvertisement;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.UserAdvertisementRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class UserAdvertisementController {
    private final UserAdvertisementRepository userAdvertisementRepository;
    private final UserInfoRepository userInfoRepository;

    public UserAdvertisementController(UserAdvertisementRepository userAdvertisementRepository, UserInfoRepository userInfoRepository) {
        this.userAdvertisementRepository = userAdvertisementRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @GetMapping("/adv/")
    public ResponseEntity<Page<Map<String, Object>>> getAllUserAdvertisements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

//        Pageable pageable = PageRequest.of(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<UserAdvertisement> userAdvertisementPage = userAdvertisementRepository.findAll(pageable);

        List<Map<String, Object>> response = new ArrayList<>();

        for (UserAdvertisement userAdvertisement : userAdvertisementPage.getContent()) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("AdvertisementId", userAdvertisement.getId());
            //res.put("created", userAdvertisement.getLocalDateTime());
            // Format LocalDateTime as a string
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = userAdvertisement.getLocalDateTime().format(formatter);
            res.put("created", formattedDateTime); // Sending AdvertisementDate as a formatted string
            res.put("description", userAdvertisement.getDescription());
            //res.put("img", userAdvertisement.getImg());
            res.put("userName", userAdvertisement.getUserInfo().getUserName());
            res.put("title", userAdvertisement.getTitle());

            response.add(res);
        }

        return ResponseEntity.ok()
                .body(new PageImpl<>(response, pageable, userAdvertisementPage.getTotalElements()));
    }

    @PostMapping("/adv/")
    public ResponseEntity<Map<String, Object>> addUserAdvertisement(
            @RequestParam("title") String title,
            @RequestParam("description") String text,
            Authentication authentication
    ) throws IOException {

        // Check if the user is authenticated (logged in)
        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        // Retrieve the userName of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        // Check if UserInfo entity exists for the user
        if (userInfo == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        LocalDateTime curDateTime = LocalDateTime.now();

        UserAdvertisement userAdvertisement = new UserAdvertisement(title, text, curDateTime, userInfo);
        userAdvertisementRepository.save(userAdvertisement);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("AdvertisementId", userAdvertisement.getId());
        //res.put("created", userAdvertisement.getLocalDateTime());
        // Format LocalDateTime as a string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = userAdvertisement.getLocalDateTime().format(formatter);
        response.put("created", formattedDateTime); // Sending AdvertisementDate as a formatted string
        response.put("description", userAdvertisement.getDescription());
        response.put("userName", userAdvertisement.getUserInfo().getUserName());
        response.put("title", userAdvertisement.getTitle());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}
