package com.portifolio.infra;

import java.time.LocalDateTime;

public record RestExceptionDTO(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        String path
) {
}
