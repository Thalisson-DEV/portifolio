# 🚀 Portfólio Profissional - Thalisson Damião

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=for-the-badge&logo=spring)
![Angular](https://img.shields.io/badge/Angular-20.x-red?style=for-the-badge&logo=angular)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📖 Sobre o Projeto

Este é meu portfólio profissional completo, desenvolvido com uma arquitetura moderna **Full Stack** composta por:
- **Frontend**: Aplicação SPA (Single Page Application) em Angular com design responsivo e animações interativas.
- **Backend**: API RESTful em Java com Spring Boot para gerenciamento de contato via e-mail.

O objetivo principal é apresentar meus projetos, habilidades técnicas e fornecer um canal direto de comunicação através de um formulário de contato funcional e profissional.

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura de microsserviços containerizada:

```text
portifolio-thalisson-dev/
├── frontend/               # Aplicação Angular (SPA)
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/      # Páginas (Home, About, Projects, Contact)
│   │   │   ├── components/ # Componentes reutilizáveis (Navbar, Footer)
│   │   │   └── services/   # Serviços (ContactService)
│   │   └── environments/   # Configurações de ambiente
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/                # API REST Spring Boot
│   ├── src/main/java/
│   │   └── com/portifolio/
│   │       ├── controller/ # Endpoints da API
│   │       ├── service/    # Lógica de envio de e-mail
│   │       ├── dto/        # Transferência de dados
│   │       └── infra/      # Configurações (CORS, Swagger)
│   ├── Dockerfile
│   └── pom.xml
│
├── .github/workflows/      # CI/CD com GitHub Actions
└── docker-compose.yml      # Orquestração dos serviços
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 20**: Framework principal para desenvolvimento SPA.
- **TypeScript**: Linguagem base do frontend.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **RxJS**: Programação reativa e gerenciamento de estado.
- **Nginx**: Servidor web para servir a aplicação em produção.

### Backend
- **Java 21**: Linguagem base (LTS).
- **Spring Boot**: Framework principal para desenvolvimento ágil.
- **Spring Boot Starter Mail**: Gerenciamento de envio de e-mails (SMTP).
- **Spring Web MVC**: Construção da API REST.
- **SpringDoc OpenAPI (Swagger)**: Documentação interativa da API.
- **Jakarta Bean Validation**: Validação de integridade dos dados.
- **Lombok**: Redução de código boilerplate.

### DevOps & Infraestrutura
- **Docker & Docker Compose**: Containerização e orquestração.
- **GitHub Actions**: Pipeline de CI/CD automatizado.
- **Hostinger VPS**: Hospedagem em produção.
- **Docker Hub**: Registro de imagens Docker.

## ⚙️ Instalação e Configuração

### Pré-requisitos
- **Docker & Docker Compose** instalados.
- **Java 21** (apenas para desenvolvimento local do backend).
- **Node.js 20+** (apenas para desenvolvimento local do frontend).
- Uma conta **Gmail** com "Senha de App" gerada para envio de e-mails.

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/Thalisson-DEV/portifolio-thalisson-dev.git
cd portifolio-thalisson-dev
```

2. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:
   ```bash
   EMAIL=seu-email@gmail.com
   EMAIL_PASSWORD=sua-senha-de-app-gerada
   ```

3. **Execute com Docker Compose**
   ```bash
   docker compose up -d
   ```

4. **Acesse a aplicação**
   - Frontend: [http://localhost](http://localhost)
   - Backend API: [http://localhost:8080](http://localhost:8080)
   - Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## 📱 Funcionalidades

### Frontend
- **Home**: Apresentação pessoal com efeito de digitação dinâmico.
- **About**: Informações sobre mim, tech stack e gráfico de contribuições do GitHub.
- **Projects**: Showcase de projetos desenvolvidos com links para GitHub e LinkedIn.
- **Contact**: Formulário de contato integrado com a API backend.
- **Animações**: Transições suaves entre páginas e feedback visual.

### Backend
- **POST /api/v1/email/send**: Endpoint para envio de mensagens de contato.
  - Envia e-mail para o proprietário do portfólio.
  - Envia auto-resposta formatada em HTML para o remetente.
  - Validação de dados com Bean Validation.
  - Tratamento global de exceções.

## 🔄 CI/CD Pipeline

O projeto possui pipeline automatizado com GitHub Actions que:

1. **Build**: Compila o backend com Maven e o frontend com Angular.
2. **Dockerize**: Cria imagens Docker otimizadas para produção.
3. **Push**: Envia as imagens para o Docker Hub.
4. **Deploy**: Conecta via SSH na VPS e atualiza os containers automaticamente.

### Fluxo de Deploy
```
Push to main → Build → Docker Build → Push to Hub → SSH Deploy → Container Update
```

## 🛡️ Segurança

- **CORS**: Configurado no backend para aceitar apenas origens confiáveis.
- **Validação**: Todas as entradas são validadas antes do processamento.
- **Secrets**: Credenciais sensíveis gerenciadas via variáveis de ambiente.
- **Non-root User**: Containers executam com usuário não privilegiado.

## 🧪 Desenvolvimento Local

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📄 Documentação da API

Acesse a documentação interativa Swagger com a aplicação rodando:

🔗 **Acesse:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

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
  Desenvolvido com ☕ e muito código por <strong>Thalisson Damião</strong>
</p>
