# Usa uma imagem leve do Java 21 (Alpine Linux)
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Cria um usuário não-root por segurança (boa prática)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copia o .jar gerado pelo Maven (o GitHub Actions vai gerar esse arquivo)
# O asterisco *.jar pega qualquer nome de arquivo gerado
COPY target/*.jar app.jar

# Define as variáveis de ambiente (serão sobrescritas pelo docker-compose)
ENV EMAIL=teste
ENV EMAIL_PASSWORD=teste

# Expõe a porta interna
EXPOSE 8080

# Comando para rodar o app
ENTRYPOINT ["java", "-jar", "app.jar"]