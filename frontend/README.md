# 🎨 Portfolio Frontend - Angular

![Angular](https://img.shields.io/badge/Angular-20.x-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📖 Sobre o Projeto

Esta é a aplicação frontend do meu portfólio profissional, desenvolvida como uma **Single Page Application (SPA)** moderna e responsiva em Angular.

O objetivo principal é apresentar meus projetos, habilidades técnicas e experiências de forma visual e interativa, além de fornecer um formulário de contato integrado com o backend Java/Spring Boot para comunicação direta.

## 🚀 Tecnologias Utilizadas

- **Angular 20**: Framework principal para desenvolvimento SPA com arquitetura standalone components.
- **TypeScript 5.9**: Linguagem base com tipagem estática.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **RxJS 7.8**: Programação reativa para gerenciamento de requisições HTTP.
- **Angular Router**: Navegação SPA com animações de transição.
- **Angular Forms**: Gerenciamento de formulários reativos.
- **Nginx**: Servidor web para produção (Alpine Linux).

## ⚙️ Arquitetura e Estrutura

A aplicação segue a arquitetura de **Standalone Components** introduzida no Angular 14+ e consolidada no Angular 20:

```text
src/
├── app/
│   ├── pages/                    # Páginas da aplicação
│   │   ├── home/                 # Página inicial com apresentação e efeito de digitação
│   │   ├── about/                # Sobre mim, tech stack e contribuições GitHub
│   │   ├── projects/             # Showcase de projetos desenvolvidos
│   │   └── contact/              # Formulário de contato integrado com backend
│   │
│   ├── components/               # Componentes reutilizáveis
│   │   ├── navbar/               # Barra de navegação responsiva
│   │   └── footer/               # Rodapé da aplicação
│   │
│   ├── services/                 # Serviços e comunicação HTTP
│   │   └── contact.ts            # Serviço de envio de mensagens para API
│   │
│   ├── animations.ts             # Definição de animações de transição
│   ├── app.config.ts             # Configuração principal da aplicação
│   ├── app.routes.ts             # Definição de rotas
│   └── app.ts                    # Componente raiz
│
├── environments/                 # Configurações de ambiente
│   ├── environment.ts            # Ambiente de desenvolvimento
│   └── environment.prod.ts       # Ambiente de produção
│
├── public/                       # Arquivos públicos estáticos
└── styles.css                    # Estilos globais e customizações Tailwind
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- **Node.js 20** ou superior.
- **npm** ou **yarn**.

### Passo a Passo

1. **Clone o repositório e acesse o diretório**
```bash
git clone <url-do-repositorio>
cd frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

   Edite o arquivo `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api/v1'
   };
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm start
   ```

   A aplicação estará disponível em `http://localhost:4200`.

5. **Build para produção**
   ```bash
   npm run build
   ```
   Os arquivos otimizados serão gerados em `dist/thalisson-dev/browser`.

## 📱 Funcionalidades

### Página Home (/)
- Apresentação pessoal com foto de perfil estilizada.
- Efeito de digitação dinâmico alternando entre diferentes títulos profissionais.
- Links para download do CV, GitHub e LinkedIn.
- Efeitos visuais de gradiente e blur com tema terminal/hacker.

### Página About (/about)
- Biografia profissional e transição de carreira.
- Lista de tecnologias e habilidades (tech stack).
- Código Java estilizado em um terminal simulado.
- Gráfico de contribuições do GitHub integrado (ghchart).

### Página Projects (/projects)
- Cards de projetos com hover effects.
- Descrição, tecnologias utilizadas e links para GitHub/LinkedIn.
- Layout responsivo em grid adaptável.
- Ícones de pasta e links estilizados.

### Página Contact (/contact)
- Formulário de contato com validação local.
- Integração com API REST do backend.
- Feedback visual em tempo real (loading states).
- Display de resposta da API em formato JSON estilizado.
- Auto-limpeza do formulário após sucesso.
- Tratamento de erros com exibição de exceções REST.

## 🎨 Estilização e Design

O projeto utiliza **Tailwind CSS** com tema customizado:

### Cores Personalizadas
- `terminal-black`: `#0d1117` - Fundo principal estilo GitHub Dark
- `terminal-gray`: `#161b22` - Background de cards
- `neon-green`: `#2ea043` - Cor de destaque (estilo terminal)
- `code-keyword`: `#ff7b72` - Sintaxe Java (keywords)
- `code-class`: `#d2a8ff` - Sintaxe Java (classes)
- `code-string`: `#a5d6ff` - Sintaxe Java (strings)

### Fontes
- **Fira Code**: Fonte monoespaçada para códigos e terminais.
- **Inter**: Fonte sans-serif para textos gerais.

### Animações
- Transições suaves entre páginas via Angular Router.
- Fade-in e slide-in effects em elementos.
- Hover effects em cards e botões.
- Cursor piscante no efeito de digitação.

## 🔌 Integração com Backend

O frontend se comunica com o backend através do `ContactService`:

**Endpoint utilizado:** `POST /api/v1/email/send`

**Request Body:**
```json
{
  "name": "Nome do visitante",
  "email": "email@exemplo.com",
  "message": "Mensagem de contato"
}
```

**Response (Sucesso - 200):**
```json
{
  "message": "Email sent successfully to Thalisson!"
}
```

**Response (Erro - 4xx/5xx):**
```json
{
  "timestamp": "2025-12-28T10:30:00",
  "status": 500,
  "error": "Email Service Failed",
  "path": "/api/v1/email/send"
}
```

## 🐳 Docker e Produção

### Dockerfile Multi-stage
```dockerfile
# Stage 1: Build
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Servidor Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/thalisson-dev/browser /usr/share/nginx/html
EXPOSE 80
```

### Build da imagem Docker
```bash
docker build -t portfolio-frontend:latest .
```

### Executar container
```bash
docker run -d -p 80:80 portfolio-frontend:latest
```

## 📊 Configurações do Angular

### Build Budgets (Performance)
- **Initial Bundle**: Máximo 1MB (warning em 500kB)
- **Component Styles**: Máximo 8kB (warning em 4kB)

### Environments
- **Development**: Source maps ativados, sem otimização.
- **Production**: File replacements, output hashing, otimização total.

## 🧪 Testes

```bash
# Executar testes unitários
npm test

# Executar testes com coverage
npm run test -- --coverage

# Modo watch para desenvolvimento
npm run watch
```

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
  Desenvolvido com 💻 e Angular por <strong>Thalisson Damião</strong>
</p>
