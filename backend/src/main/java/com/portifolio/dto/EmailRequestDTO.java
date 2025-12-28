package com.portifolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmailRequestDTO(
        @NotNull(message = "Name is required")
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email sent as input")
        String email,
        @NotNull(message = "Name is required")
        @NotBlank(message = "Message is required")
        String message) {
}
