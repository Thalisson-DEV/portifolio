package com.portifolio.infra;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Email Sender API")
                        .version("v1")
                        .description("API developed in Java SpringBoot to send emails")
                        .license(new License()
                                .name("MIT")
                        )
                )
                .externalDocs(new ExternalDocumentation()
                        .description("GitHub Doc")
                        .url("")
                );
    }
}
