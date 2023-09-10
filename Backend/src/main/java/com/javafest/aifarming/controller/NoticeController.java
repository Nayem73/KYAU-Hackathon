package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Notice;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.NoticeRepository;
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
public class NoticeController {
    private final NoticeRepository noticeRepository;
    private final UserInfoRepository userInfoRepository;

    public NoticeController(NoticeRepository noticeRepository, UserInfoRepository userInfoRepository) {
        this.noticeRepository = noticeRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @GetMapping("/notice/")
    public ResponseEntity<Page<Map<String, Object>>> getAllNotices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

//        Pageable pageable = PageRequest.of(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<Notice> noticePage = noticeRepository.findAll(pageable);

        List<Map<String, Object>> response = new ArrayList<>();

        for (Notice notice : noticePage.getContent()) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("noticeId", notice.getId());
            //res.put("created", notice.getLocalDateTime());
            // Format LocalDateTime as a string
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = notice.getLocalDateTime().format(formatter);
            res.put("created", formattedDateTime); // Sending AdvertisementDate as a formatted string
            res.put("description", notice.getDescription());
            res.put("userName", notice.getUserInfo().getUserName());
            res.put("title", notice.getTitle());

            response.add(res);
        }

        return ResponseEntity.ok()
                .body(new PageImpl<>(response, pageable, noticePage.getTotalElements()));
    }

    @PostMapping("/notice/")
    public ResponseEntity<Map<String, Object>> addnotice(
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

        Notice notice = new Notice(title, text, curDateTime, userInfo);
        noticeRepository.save(notice);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("noticeId", notice.getId());
        //res.put("created", notice.getLocalDateTime());
        // Format LocalDateTime as a string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = notice.getLocalDateTime().format(formatter);
        response.put("created", formattedDateTime); // Sending AdvertisementDate as a formatted string
        response.put("description", notice.getDescription());
        response.put("userName", notice.getUserInfo().getUserName());
        response.put("title", notice.getTitle());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}
