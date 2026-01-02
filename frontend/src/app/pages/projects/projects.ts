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
          <span class="text-neon-green">02.</span> <span i18n="@@projectsTitle">Projects</span>
        </h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let project of projects" class="group bg-terminal-gray border border-gray-700 hover:border-neon-green transition duration-300 rounded-lg p-6 flex flex-col h-full">
          
          <div class="flex justify-between items-start mb-4">
            <i class="devicon-folder-open-plain text-4xl text-neon-green" aria-hidden="true"></i>
            
            <div class="flex items-center gap-4">
              
              <button 
                (click)="toggleProjectView(project)" 
                class="text-gray-400 hover:text-white transition transform hover:scale-110 focus:outline-none"
                [attr.aria-label]="project.showIcons ? 'Switch to text view' : 'Switch to icon view'"
                [title]="project.showIcons ? 'Ver como texto' : 'Ver como ícones'">
                
                <i [class]="project.showIcons ? 'devicon-bash-plain text-xl' : 'devicon-devicon-plain text-xl'" aria-hidden="true"></i>
              </button>

              <a *ngIf="project.github" [href]="project.github" target="_blank" [attr.aria-label]="'View ' + project.title + ' source code on GitHub'" class="text-gray-400 hover:text-white transition transform hover:scale-110">
                <i class="devicon-github-original text-xl" aria-hidden="true"></i>
              </a>
              
              <a *ngIf="project.linkedin" [href]="project.linkedin" target="_blank" [attr.aria-label]="'View ' + project.title + ' post on LinkedIn'" class="text-gray-400 hover:text-white transition transform hover:scale-110">
                <i class="devicon-linkedin-plain text-xl" aria-hidden="true"></i>
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
                <div class="group/tech relative flex flex-col items-center" tabindex="0" [attr.aria-label]="tech">
                  <i *ngIf="getIconClass(tech)" 
                     [class]="getIconClass(tech) + ' text-2xl text-gray-400 hover:text-neon-green transition-all duration-300 transform hover:scale-110 cursor-help'" 
                     aria-hidden="true">
                  </i>
                  
                  <span *ngIf="getIconClass(tech)" class="absolute -bottom-8 opacity-0 group-hover/tech:opacity-100 transition-opacity text-[10px] text-white bg-gray-900 px-2 py-1 rounded border border-gray-700 whitespace-nowrap z-10 pointer-events-none">
                    {{ tech }}
                  </span>

                  <span *ngIf="!getIconClass(tech)" class="text-[10px] border border-gray-700 px-1 rounded text-gray-500" [title]="tech">
                    {{ tech }}
                  </span>
                </div>
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
      description: $localize`:@@projectPortfolioDesc:My personal portfolio developed with Angular, Tailwind CSS, Java, and Spring, highlighting my skills and software development projects.`,
      tech: ['Java', 'Spring Boot', 'Typescript', 'Angular', 'Tailwind CSS', 'Docker', 'Github Actions'],
      github: 'https://github.com/Thalisson-DEV/portifolio',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-angular-activity-7411796301253844992-YGQx?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'Backpack',
      description: $localize`:@@projectBackpackDesc:Full Stack platform for institutional English teaching. Complete integration with user control and educational business rules.`,
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'JavaScript', 'Docker', 'Redis'],
      github: 'https://github.com/Thalisson-DEV/bp-web',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_desenvolvimentodesoftware-java-springboot-activity-7358647247649001474-a6eW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'LangChain4j Integration',
      description: $localize`:@@projectLangchainDesc:Backend exploring RAG and Generative AI in the Java ecosystem. Integration with LLMs for natural language processing.`,
      tech: ['Java', 'Spring Boot', 'LangChain4j', 'Gemini'],
      github: 'https://github.com/Thalisson-DEV/langchain4j-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-langchain4j-activity-7409944520081117185-aSv0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'Desafio Angular API',
      description: $localize`:@@projectAngularApiDesc:Backend for Angular developer technical challenge. Implementation of RESTful APIs with Java and Spring Boot.`,
      tech: ['Java', 'Spring Boot', 'Redis', 'Docker', 'PostgreSQL'],
      github: 'https://github.com/Thalisson-DEV/desafio-angular-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-desenvolvedorbackend-activity-7383169955678093312-nyeh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    },
    {
      title: 'GeoRoute API',
      description: $localize`:@@projectGeorouteDesc:Geolocation API for logistics optimization. Integration with Google Maps API for customer location delivery.`,
      tech: ['Java', 'Spring Boot', 'Google Maps API', 'NeonDB'],
      github: 'https://github.com/Thalisson-DEV/GeoRoute-C-API',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-fullstack-activity-7354621537766760448-JRyc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: false
    }
  ];
}