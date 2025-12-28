# 📧 Portfolio Contact API

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=for-the-badge&logo=spring)
![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?style=for-the-badge&logo=swagger)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📖 Sobre o Projeto

Esta é uma API RESTful robusta desenvolvida para gerenciar o envio de mensagens de contato provenientes do meu portfólio pessoal.

O objetivo principal deste serviço é orquestrar a comunicação entre o visitante do site e o proprietário. Ao receber uma submissão, a API realiza duas ações simultâneas:
1. **Encaminhamento:** Envia os detalhes do contato diretamente para a minha caixa de entrada.
2. **Auto-resposta:** Envia um e-mail de confirmação automático e formatado em HTML para o usuário, garantindo uma experiência profissional.

## 🚀 Tecnologias Utilizadas

O projeto foi construído com as melhores práticas do ecossistema Spring:

- **Java 21**: Linguagem base (LTS).
- **Spring Boot**: Framework principal para desenvolvimento ágil.
- **Spring Boot Starter Mail**: Gerenciamento de envio de e-mails (SMTP).
- **Spring Web MVC**: Construção da API REST.
- **SpringDoc OpenAPI (Swagger)**: Documentação interativa da API.
- **Jakarta Bean Validation**: Validação de integridade dos dados de entrada.
- **Lombok**: Redução de código boilerplate.
- **Maven**: Gerenciamento de dependências.

## ⚙️ Arquitetura e Estrutura

A aplicação segue uma arquitetura em camadas bem definida para facilitar a manutenção e escalabilidade.

```text
src/main/java/com/portifolio/
├── controller/          # Camada de exposição da API (Endpoints)
├── dto/                 # Transferência de dados (Request/Response)
├── service/             # Regras de negócio e lógica de envio de e-mail
├── exception/           # Exceções personalizadas
└── infra/               # Configurações (CORS, Swagger, Global Exception Handler)
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- **Java 21** ou superior.
- **Maven**.
- Uma conta **Gmail** (ou outro provedor SMTP) com a "Senha de App" gerada.

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd backend
```

2. **Configuração de Variáveis de Ambiente**
   Por segurança, não commitamos credenciais. Configure as variáveis de ambiente no seu sistema ou crie um arquivo de propriedades local.

   **Linux/Mac:**
   ```bash
   export EMAIL=seu-email@gmail.com
   export EMAIL_PASSWORD=sua-senha-de-app-gerada
   ```

   **Windows (PowerShell):**
   ```powershell
   $env:EMAIL="seu-email@gmail.com"
   $env:EMAIL_PASSWORD="sua-senha-de-app-gerada"
   ```

3. **Compile e Execute**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   A aplicação iniciará em `http://localhost:8080`.

## 🔌 Endpoints da API

### Enviar E-mail de Contato

Envie uma mensagem, dispare a notificação para o admin e a confirmação para o usuário.

**Rota:** `POST /api/v1/email/send`

**Corpo da Requisição (JSON):**
```json
{
  "name": "Recrutador Exemplo",
  "email": "recrutador@empresa.com",
  "message": "Olá! Gostaria de discutir uma oportunidade de projeto Java."
}
```

**Regras de Validação:**
- `name`: Obrigatório.
- `email`: Obrigatório e deve ser um formato válido.
- `message`: Obrigatório.

**Resposta de Sucesso (200 OK):**
```json
{
  "message": "Email sent successfully to Thalisson!"
}
```

**Resposta de Erro (Exemplo):**
```json
{
  "timestamp": "2025-12-28T10:30:00",
  "status": 500,
  "error": "Email Service Failed",
  "message": "Failed to send email",
  "path": "/api/v1/email/send"
}
```

## 📄 Documentação (Swagger UI)

Para testar os endpoints visualmente e ver os detalhes dos schemas, acesse a interface do Swagger com a aplicação rodando:

🔗 **Acesse:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## 🛡️ Tratamento de Erros

A API possui um `GlobalExceptionHandler` que padroniza as respostas de erro para o frontend:

- **400 Bad Request:** Erros de validação (campos vazios, email inválido).
- **500 Internal Server Error:** Falhas no serviço de SMTP ou erros inesperados.

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`)
3. Faça o Commit (`git commit -m 'Add: nova feature incrível'`)
4. Faça o Push (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto faz parte do portfólio profissional de Thalisson Damião.

---
<p align="center">
  Desenvolvido com ☕ e Java por <strong>Thalisson Damião</strong>
</p>