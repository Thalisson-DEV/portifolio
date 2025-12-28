package com.portifolio.controller;

import com.portifolio.dto.EmailRequestDTO;
import com.portifolio.service.EmailService;
import jakarta.validation.Valid;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("api/v1/email")
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<@NonNull Map< String, String>> sendEmail(@RequestBody @Valid EmailRequestDTO request) {
        emailService.sendContactMessage(request);
        return ResponseEntity.ok(Collections.singletonMap("message", "Email sent successfully to Thalisson!"));
    }
}
