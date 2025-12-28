package com.portifolio.service;

import com.portifolio.dto.EmailRequestDTO;
import com.portifolio.exception.EmailServiceException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService (JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${spring.mail.username}")
    private String myEmail;

    public void sendContactMessage(EmailRequestDTO request) {
        if (request.name().isBlank() || request.message().isBlank()) {
            throw new EmailServiceException("Invalid Addresses");
        }

        SimpleMailMessage adminMessage = new SimpleMailMessage();
        adminMessage.setFrom(myEmail);
        adminMessage.setTo(myEmail);
        adminMessage.setReplyTo(request.email());
        adminMessage.setSubject("Portfólio Contact: " + request.name());
        adminMessage.setText("Mensagem de: " + request.name() + " <" + request.email() + ">\n\n" + request.message());

        mailSender.send(adminMessage);

        try {
            sendAutoReply(request.name(), request.email());
        } catch (MessagingException e) {
            throw new EmailServiceException("Failed to send auto-reply email", e.getCause());
        }
    }

    private void sendAutoReply(String clientName, String clientEmail) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String htmlMsg = """
            <div style="background-color: #0d1117; padding: 40px; font-family: 'Courier New', monospace; color: #e6edf3;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #161b22; padding: 30px; border-radius: 8px; border: 1px solid #30363d;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="display: inline-block; width: 64px; height: 64px; border: 2px solid #2ea043; border-radius: 12px; line-height: 64px; font-size: 24px; color: #2ea043; font-weight: bold;">&lt;T/&gt;</div>
                    </div>
                    <h2 style="color: #2ea043; text-align: center;">Message Received!</h2>
                    <p>Olá, <strong>%s</strong>.</p>
                    <p style="color: #8b949e;">Recebi seu contato através do meu portfólio. Muito obrigado!</p>
                    <div style="background-color: #0d1117; padding: 15px; border-left: 4px solid #2ea043; margin: 20px 0; color: #a5d6ff; font-size: 13px;">
                        > System.out.println("Responderei em breve!");<br>
                        > Status: <strong>Processing...</strong>
                    </div>
                    <p style="color: #8b949e; font-size: 14px;">Atenciosamente,<br><strong style="color: #e6edf3;">Thalisson Damião</strong></p>
                </div>
            </div>
        """.formatted(clientName);

        helper.setText(htmlMsg, true);
        helper.setTo(clientEmail);
        helper.setSubject("Confirmação de Contato - Thalisson Dev");
        helper.setFrom(myEmail);

        mailSender.send(mimeMessage);
    }
}
