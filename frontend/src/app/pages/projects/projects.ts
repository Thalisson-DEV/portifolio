import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-white mb-10"><span class="text-neon-green">02.</span> Projects</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let project of projects" class="group bg-terminal-gray border border-gray-700 hover:border-neon-green transition duration-300 rounded-lg p-6 flex flex-col">
          
          <div class="flex justify-between items-start mb-4">
            <i class="devicon-folder-open-plain text-4xl text-neon-green"></i>
            <div class="flex gap-4">
              <a *ngIf="project.github" [href]="project.github" target="_blank" class="text-gray-400 hover:text-white"><i class="devicon-github-original text-xl"></i></a>
              <a *ngIf="project.linkedin" [href]="project.linkedin" target="_blank" class="text-gray-400 hover:text-white"><i class="devicon-linkedin-plain text-xl"></i></a>
            </div>
          </div>

          <h3 class="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition">{{ project.title }}</h3>
          <p class="text-gray-400 text-sm mb-6 flex-grow">{{ project.description }}</p>

          <div class="flex flex-wrap gap-2 mt-auto">
            <span *ngFor="let tech of project.tech" class="text-xs font-mono text-neon-green/80">
              {{ tech }}
            </span>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Portifolio',
      description: 'Meu portfólio pessoal desenvolvido com Angular, Tailwind CSS, Java e Spring, destacando minhas habilidades e projetos em desenvolvimento de software.',
      tech: ['Java', 'Spring Boot', 'Typescript', 'Angular', 'Tailwind CSS', 'Docker', 'Github Actions'],
      github: 'https://github.com/Thalisson-DEV/portifolio',
      linkedin: ''
    },
    {
      title: 'Backpack',
      description: 'Plataforma Full Stack para ensino de inglês institucional. Integração completa com controle de usuários e regras de negócio educacionais.',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'JavaScript', 'Docker', 'Redis'],
      github: 'https://github.com/Thalisson-DEV/bp-web',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_desenvolvimentodesoftware-java-springboot-activity-7358647247649001474-a6eW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI'
    },
    {
      title: 'LangChain4j Integration',
      description: 'Backend explorando RAG e IA Generativa no ecossistema Java. Integração com LLMs para processamento de linguagem natural.',
      tech: ['Java', 'Spring Boot', 'LangChain4j', 'Gemini'],
      github: 'https://github.com/Thalisson-DEV/langchain4j-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-langchain4j-activity-7409944520081117185-aSv0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI'
    },
    {
      title: 'Desafio Angular API',
      description: 'Backend para desafio técnico de desenvolvedor Angular. Implementação de APIs RESTful com Java e Spring Boot.',
      tech: ['Java', 'Spring Boot', 'Cache', 'Redis', 'Docker', 'PostgreSQL'],
      github: 'https://github.com/Thalisson-DEV/desafio-angular-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-desenvolvedorbackend-activity-7383169955678093312-nyeh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI'
    },
    {
      title: 'GeoRoute API',
      description: 'API de geolocalização para otimização logística. Integração com Google Maps API para entrega da localização de clientes.',
      tech: ['Java', 'Spring Boot', 'Google Maps API', 'NeonDB'],
      github: 'https://github.com/Thalisson-DEV/GeoRoute-C-API',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-fullstack-activity-7354621537766760448-JRyc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI'
    }
  ];
}