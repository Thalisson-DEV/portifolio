import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  linkedin: string;
  showIcons: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-24 pb-40 px-4 max-w-7xl mx-auto">
      
      <div class="mb-10">
        <h2 class="text-3xl font-bold text-white">
          <span class="text-neon-green">02.</span> Projects
        </h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let project of projects" class="group bg-terminal-gray border border-gray-700 hover:border-neon-green transition duration-300 rounded-lg p-6 flex flex-col h-full">
          
          <div class="flex justify-between items-start mb-4">
            <i class="devicon-folder-open-plain text-4xl text-neon-green"></i>
            
            <div class="flex items-center gap-4">
              
              <button 
                (click)="toggleProjectView(project)" 
                class="text-gray-400 hover:text-white transition transform hover:scale-110 focus:outline-none"
                [title]="project.showIcons ? 'Ver como texto' : 'Ver como ícones'">
                
                <i [class]="project.showIcons ? 'devicon-bash-plain text-xl' : 'devicon-devicon-plain text-xl'"></i>
              </button>

              <a *ngIf="project.github" [href]="project.github" target="_blank" class="text-gray-400 hover:text-white transition transform hover:scale-110">
                <i class="devicon-github-original text-xl"></i>
              </a>
              
              <a *ngIf="project.linkedin" [href]="project.linkedin" target="_blank" class="text-gray-400 hover:text-white transition transform hover:scale-110">
                <i class="devicon-linkedin-plain text-xl"></i>
              </a>
            </div>
          </div>

          <h3 class="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition">{{ project.title }}</h3>
          <p class="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{{ project.description }}</p>

          <div class="mt-auto h-8 flex items-center"> <div *ngIf="!project.showIcons" class="flex flex-wrap gap-2 animate-fade-in">
              <span *ngFor="let tech of project.tech" class="text-xs font-mono text-neon-green/80 bg-neon-green/10 px-2 py-1 rounded">
                {{ tech }}
              </span>
            </div>

            <div *ngIf="project.showIcons" class="flex flex-wrap gap-3 items-center animate-fade-in">
              <ng-container *ngFor="let tech of project.tech">
                <i *ngIf="getIconClass(tech)" 
                   [class]="getIconClass(tech) + ' text-2xl text-gray-400 hover:text-neon-green transition cursor-help'" 
                   [title]="tech">
                </i>
                <span *ngIf="!getIconClass(tech)" class="text-[10px] border border-gray-700 px-1 rounded text-gray-500" [title]="tech">
                  {{ tech }}
                </span>
              </ng-container>
            </div>

          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class ProjectsComponent {

  toggleProjectView(project: Project) {
    project.showIcons = !project.showIcons;
  }

  techIconMap: { [key: string]: string } = {
    'Java': 'devicon-java-plain',
    'Spring Boot': 'devicon-spring-original',
    'Spring Security': 'devicon-spring-plain',
    'Typescript': 'devicon-typescript-plain',
    'JavaScript': 'devicon-javascript-plain',
    'Angular': 'devicon-angularjs-plain',
    'Tailwind CSS': 'devicon-tailwindcss-original',
    'Docker': 'devicon-docker-plain',
    'PostgreSQL': 'devicon-postgresql-plain',
    'Redis': 'devicon-redis-plain',
    'Github Actions': 'devicon-githubactions-plain',
    'Google Maps API': 'devicon-google-plain',
    'Gemini': 'devicon-google-plain',
    'NeonDB': 'devicon-postgresql-plain',
    'Cache': 'devicon-redis-plain',
    'Power Apps': 'devicon-microsoft-plain'
  };

  getIconClass(techName: string): string {
    return this.techIconMap[techName] || '';
  }

  projects: Project[] = [
    {
      title: 'Portifolio',
      description: 'Meu portfólio pessoal desenvolvido com Angular, Tailwind CSS, Java e Spring, destacando minhas habilidades e projetos em desenvolvimento de software.',
      tech: ['Java', 'Spring Boot', 'Typescript', 'Angular', 'Tailwind CSS', 'Docker', 'Github Actions'],
      github: 'https://github.com/Thalisson-DEV/portifolio',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-angular-activity-7411796301253844992-YGQx?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'Backpack',
      description: 'Plataforma Full Stack para ensino de inglês institucional. Integração completa com controle de usuários e regras de negócio educacionais.',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'JavaScript', 'Docker', 'Redis'],
      github: 'https://github.com/Thalisson-DEV/bp-web',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_desenvolvimentodesoftware-java-springboot-activity-7358647247649001474-a6eW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'LangChain4j Integration',
      description: 'Backend explorando RAG e IA Generativa no ecossistema Java. Integração com LLMs para processamento de linguagem natural.',
      tech: ['Java', 'Spring Boot', 'LangChain4j', 'Gemini'],
      github: 'https://github.com/Thalisson-DEV/langchain4j-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-langchain4j-activity-7409944520081117185-aSv0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'Desafio Angular API',
      description: 'Backend para desafio técnico de desenvolvedor Angular. Implementação de APIs RESTful com Java e Spring Boot.',
      tech: ['Java', 'Spring Boot', 'Redis', 'Docker', 'PostgreSQL'],
      github: 'https://github.com/Thalisson-DEV/desafio-angular-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-desenvolvedorbackend-activity-7383169955678093312-nyeh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'GeoRoute API',
      description: 'API de geolocalização para otimização logística. Integração com Google Maps API para entrega da localização de clientes.',
      tech: ['Java', 'Spring Boot', 'Google Maps API', 'NeonDB'],
      github: 'https://github.com/Thalisson-DEV/GeoRoute-C-API',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-fullstack-activity-7354621537766760448-JRyc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    }
  ];
}