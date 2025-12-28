package com.portifolio.infra;

import com.portifolio.exception.EmailServiceException;
import jakarta.mail.MessagingException;
import jakarta.mail.SendFailedException;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EmailServiceException.class)
    private ResponseEntity<@NonNull RestExceptionDTO> handleEmailServiceException(EmailServiceException exception) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        RestExceptionDTO restException = new RestExceptionDTO(
                LocalDateTime.now(),
                status.value(),
                "Email Service Failed",
                exception.getMessage(),
                "/api/v1/email/send"
        );

        return new ResponseEntity<>(restException, status);
    }

    @ExceptionHandler(MessagingException.class)
    private ResponseEntity<@NonNull RestExceptionDTO> handleMailException(MessagingException exception) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        RestExceptionDTO restException = new RestExceptionDTO(
                LocalDateTime.now(),
                status.value(),
                "Messaging Failed",
                exception.getMessage(),
                "/api/v1/email/send"
        );

        return new ResponseEntity<>(restException, status);
    }

    @ExceptionHandler(SendFailedException.class)
    private ResponseEntity<@NonNull RestExceptionDTO> handleSenderMailException(SendFailedException exception) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        RestExceptionDTO restException = new RestExceptionDTO(
                LocalDateTime.now(),
                status.value(),
                "Send Mail Failed",
                exception.getMessage(),
                "/api/v1/email/send"
        );

        return new ResponseEntity<>(restException, status);
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<@NonNull RestExceptionDTO> handleGeneralException(Exception exception) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        RestExceptionDTO restException = new RestExceptionDTO(
                LocalDateTime.now(),
                status.value(),
                "Internal Server Error",
                exception.getMessage(),
                "/api/v1/email/send"
        );

        return new ResponseEntity<>(restException, status);
    }
}
