package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Employment;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.EmploymentRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EmploymentController {
    private final UserInfoRepository userInfoRepository;
    private final EmploymentRepository employmentRepository;

    public EmploymentController(UserInfoRepository userInfoRepository, EmploymentRepository employmentRepository) {
        this.userInfoRepository = userInfoRepository;
        this.employmentRepository = employmentRepository;
    }

    @GetMapping("/employment/")
    public ResponseEntity<Page<Map<String, Object>>> getAllEmployments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

//        Pageable pageable = PageRequest.of(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<Employment> employmentPage = employmentRepository.findAll(pageable);

        List<Map<String, Object>> response = new ArrayList<>();

        for (Employment employment : employmentPage.getContent()) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("employmentId", employment.getId());
            //res.put("created", employment.getLocalDateTime());
            // Format LocalDateTime as a string
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = employment.getLocalDateTime().format(formatter);
            res.put("created", formattedDateTime); // Sending AdvertisementDate as a formatted string
            res.put("description", employment.getDescription());
            res.put("userName", employment.getUserInfo().getUserName());
            res.put("title", employment.getTitle());

            response.add(res);
        }

        return ResponseEntity.ok()
                .body(new PageImpl<>(response, pageable, employmentPage.getTotalElements()));
    }

    @PostMapping("/employment/")
    public ResponseEntity<Map<String, Object>> addemployment(
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

        Employment employment = new Employment(title, text, curDateTime, userInfo);
        employmentRepository.save(employment);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("employmentId", employment.getId());
        //res.put("created", employment.getLocalDateTime());
        // Format LocalDateTime as a string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = employment.getLocalDateTime().format(formatter);
        response.put("created", formattedDateTime); // Sending AdvertisementDate as a formatted string
        response.put("description", employment.getDescription());
        response.put("userName", employment.getUserInfo().getUserName());
        response.put("title", employment.getTitle());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}
