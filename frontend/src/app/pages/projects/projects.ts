import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  objectives?: string[];
  gains?: string[];
  tech: string[];
  github: string;
  linkedin?: string;
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
        <div *ngFor="let project of projects" class="group bg-terminal-gray border border-gray-700 hover:border-neon-green transition duration-300 rounded-lg p-6 flex flex-col h-full relative overflow-hidden">

          <div class="flex justify-between items-start mb-4">
            <i class="devicon-folder-open-plain text-4xl text-neon-green" aria-hidden="true"></i>

            <div class="flex items-center gap-4">
              <button
                (click)="toggleProjectView(project); $event.stopPropagation()"
                class="text-gray-400 hover:text-white transition transform hover:scale-110 focus:outline-none"
                [attr.aria-label]="project.showIcons ? 'Switch to text view' : 'Switch to icon view'"
                [title]="project.showIcons ? 'Ver como texto' : 'Ver como ícones'">
                <i [class]="project.showIcons ? 'devicon-bash-plain text-xl' : 'devicon-devicon-plain text-xl'" aria-hidden="true"></i>
              </button>

              <a *ngIf="project.github" [href]="project.github" target="_blank" (click)="$event.stopPropagation()" [attr.aria-label]="'View ' + project.title + ' source code on GitHub'" class="text-gray-400 hover:text-white transition transform hover:scale-110">
                <i class="devicon-github-original text-xl" aria-hidden="true"></i>
              </a>

              <a *ngIf="project.linkedin" [href]="project.linkedin" target="_blank" (click)="$event.stopPropagation()" [attr.aria-label]="'View ' + project.title + ' post on LinkedIn'" class="text-gray-400 hover:text-white transition transform hover:scale-110">
                <i class="devicon-linkedin-plain text-xl" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <h3 class="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition cursor-pointer" (click)="openModal(project)">
            {{ project.title }}
          </h3>

          <p class="text-gray-400 text-sm mb-6 flex-grow leading-relaxed cursor-pointer hover:text-gray-300 transition" (click)="openModal(project)">
            {{ project.description }}
          </p>

          <!-- Action and Tech area -->
          <div class="mt-auto pt-6 flex flex-col gap-6">

            <button (click)="openModal(project)" class="px-4 py-2 border border-neon-green text-neon-green font-mono text-xs hover:bg-neon-green hover:text-white transition rounded self-start focus:outline-none uppercase tracking-wider">
              view_details()
            </button>

            <div class="flex items-center min-h-[40px]">
              <div *ngIf="!project.showIcons" class="flex flex-wrap gap-2 animate-fade-in">
                <span *ngFor="let tech of project.tech" class="text-[10px] font-mono text-neon-green/80 bg-neon-green/10 px-2 py-1 rounded border border-neon-green/10">
                  {{ tech }}
                </span>
              </div>

              <div *ngIf="project.showIcons" class="flex flex-wrap gap-3 items-center animate-fade-in">
                <ng-container *ngFor="let tech of project.tech">
                  <div class="group/tech relative flex flex-col items-center" tabindex="0" [attr.aria-label]="tech">
                    <i *ngIf="getIconClass(tech)"
                       [class]="getIconClass(tech) + ' text-xl text-gray-400 hover:text-neon-green transition-all duration-300 transform hover:scale-110 cursor-help'"
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

      <!-- Project Detail Modal -->
      <div *ngIf="selectedProject" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" (click)="closeModal()">
        <div class="bg-terminal-gray border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col" (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="p-6 border-b border-gray-700 flex justify-between items-start sticky top-0 bg-terminal-gray z-10">
            <div>
              <h3 class="text-2xl font-bold text-white mb-2">{{ selectedProject.title }}</h3>
              <div class="flex gap-4">
                 <a *ngIf="selectedProject.github" [href]="selectedProject.github" target="_blank" class="text-gray-400 hover:text-neon-green flex items-center gap-2 text-sm transition">
                  <i class="devicon-github-original"></i> Source Code
                </a>
                <a *ngIf="selectedProject.linkedin" [href]="selectedProject.linkedin" target="_blank" class="text-gray-400 hover:text-neon-green flex items-center gap-2 text-sm transition">
                  <i class="devicon-linkedin-plain"></i> LinkedIn Post
                </a>
              </div>
            </div>
            <button (click)="closeModal()" class="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-6 overflow-y-auto">

            <!-- Technologies -->
            <div>
              <h4 class="text-sm uppercase tracking-wider text-gray-500 mb-3 font-semibold" i18n="@@projectTechnologies">Technologies</h4>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tech of selectedProject.tech" class="text-xs font-mono text-neon-green/90 bg-neon-green/10 px-2 py-1 rounded border border-neon-green/20">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div *ngIf="selectedProject.detailedDescription">
              <h4 class="text-sm uppercase tracking-wider text-gray-500 mb-2 font-semibold" i18n="@@projectAbout">About</h4>
              <p class="text-gray-300 leading-relaxed">{{ selectedProject.detailedDescription }}</p>
            </div>

            <!-- Objectives -->
            <div *ngIf="selectedProject.objectives && selectedProject.objectives.length > 0">
              <h4 class="text-sm uppercase tracking-wider text-gray-500 mb-2 font-semibold" i18n="@@projectObjectives">Objectives</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-300">
                <li *ngFor="let obj of selectedProject.objectives">{{ obj }}</li>
              </ul>
            </div>

            <!-- Gains -->
            <div *ngIf="selectedProject.gains && selectedProject.gains.length > 0">
              <h4 class="text-sm uppercase tracking-wider text-gray-500 mb-2 font-semibold" i18n="@@projectKeyGains">Key Gains</h4>
              <ul class="list-none space-y-2">
                <li *ngFor="let gain of selectedProject.gains" class="flex items-start gap-2 text-gray-300">
                  <span class="text-neon-green mt-1">✓</span>
                  <span>{{ gain }}</span>
                </li>
              </ul>
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

  selectedProject: Project | null = null;

  toggleProjectView(project: Project) {
    project.showIcons = !project.showIcons;
  }

  openModal(project: Project) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.selectedProject = null;
    document.body.style.overflow = ''; // Restore scrolling
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
    'Power Apps': 'devicon-microsoft-plain',
    'Prometheus': 'devicon-prometheus-original',
    'Grafana': 'devicon-grafana-plain',
    'Flyway': 'devicon-flyway-plain',
    'Resilience4j': 'devicon-spring-plain',
    'PWA': 'devicon-javascript-plain',
    'Dexie.js': 'devicon-javascript-plain',
    'Next.js': 'devicon-nextjs-plain',
    'Fastify': 'devicon-nodejs-plain',
    'Supabase': 'devicon-supabase-plain',
    'Claude AI': 'devicon-illustrator-plain',
    'Astro': 'devicon-astro-plain',
    'Drizzle': 'devicon-javascript-plain',
    'Node.js': 'devicon-nodejs-plain'
  };

  getIconClass(techName: string): string {
    return this.techIconMap[techName] || '';
  }

  projects: Project[] = [
    {
      title: 'Kore — AI ATS Optimizer',
      description: $localize`:@@projectKoreDesc:Fullstack SaaS for resume optimization with AI and deterministic scoring.`,
      detailedDescription: $localize`:@@projectKoreDetailed:Kore is a high-performance fullstack SaaS designed to optimize resumes against ATS systems. The core technical differentiator is the 100% deterministic and auditable ATS score via pure mathematics, while Claude 3.5 Sonnet handles directed rewriting. It features a Next.js 15 dashboard, a Fastify 5 backend, and a 6-stage AI pipeline.`,
      objectives: [
        $localize`:@@projectKoreObj1:Implement deterministic scoring (cosine similarity + keyword density) isolated from the LLM.`,
        $localize`:@@projectKoreObj2:Develop end-to-end streaming via SSE for progressive optimization display.`,
        $localize`:@@projectKoreObj3:Ensure maximum security with AES-256-GCM encryption for API keys (BYOK model).`,
        $localize`:@@projectKoreObj4:Optimize performance and costs with aggressive embedding caching via SHA-256.`
      ],
      gains: [
        $localize`:@@projectKoreGain1:Immediate and transparent feedback on resume compatibility.`,
        $localize`:@@projectKoreGain2:Highly scalable and secure architecture for sensitive data processing.`,
        $localize`:@@projectKoreGain3:Modern and responsive interface focused on developer experience.`
      ],
      tech: ['Next.js', 'Fastify', 'Astro', 'Supabase', 'AI', 'Drizzle', 'Redis', 'Tailwind CSS'],
      github: '',
      showIcons: true
    },
    {
      title: 'C.E.S (Controle Estratégico)',
      description: $localize`:@@projectCesDesc:ERP for strategic control of logistics, commercial and HR operations.`,
      detailedDescription: $localize`:@@projectCesDetailed:C.E.S is a mission-critical ERP designed to orchestrate complex operations with high performance and security. It features a Java 21 Modulith backend with Virtual Threads, an Angular backoffice, and an offline-first PWA for field teams. Implements Domain-Driven Design (DDD), AES-256 GCM encryption, and Outbox Pattern for reliable offline synchronization.`,
      objectives: [
        $localize`:@@projectCesObj1:Orchestrate logistics, commercial, and HR operations in a unified platform.`,
        $localize`:@@projectCesObj2:Ensure 100% availability for field teams via Offline-First PWA.`,
        $localize`:@@projectCesObj3:Implement rigorous security standards, including data encryption and immutable auditing.`,
        $localize`:@@projectCesObj4:Process high I/O volumes using Java Virtual Threads.`
      ],
      gains: [
        $localize`:@@projectCesGain1:Reduced operational latency with Modulith architecture and Virtual Threads.`,
        $localize`:@@projectCesGain2:Elimination of data loss in field operations via robust offline synchronization.`,
        $localize`:@@projectCesGain3:Increased security and compliance with AES-256 encryption and JSONB auditing.`
      ],
      tech: ['Java', 'Spring Boot', 'Angular', 'PWA', 'Dexie.js', 'PostgreSQL', 'Redis', 'Flyway', 'Resilience4j'],
      github: '',
      showIcons: true
    },
    {
      title: 'GeoRoute',
      description: $localize`:@@projectGeorouteDesc:Corporate Full Stack solution for logistics optimization with real-time geolocation.`,
      detailedDescription: $localize`:@@projectGeorouteDetailed:The Sipel Logistics Helper (codenamed GeoRoute) is a corporate Full Stack solution designed to optimize the logistical operations of Sipel Construções LTDA. It centralizes critical client and infrastructure data, integrating it with geolocation services to facilitate route planning and field service.`,
      objectives: [
        $localize`:@@projectGeorouteObj1:Centralize querying of Installations, Contract Accounts, and Network Assets.`,
        $localize`:@@projectGeorouteObj2:Offer unified and fast searches with automatic data type detection.`,
        $localize`:@@projectGeorouteObj3:Integrate directly with Google Maps for navigation to service points.`,
        $localize`:@@projectGeorouteObj4:Process large volumes of data asynchronously via CSV.`
      ],
      gains: [
        $localize`:@@projectGeorouteGain1:Receiving over 200 requests per day.`,
        $localize`:@@projectGeorouteGain2:Guaranteeing the localization of over 6,000 customers per month.`,
        $localize`:@@projectGeorouteGain3:Optimizing logistics by 93%.`,
        $localize`:@@projectGeorouteGain4:Replaced a complex mobile spreadsheet workflow with an intuitive interface for users with limited IT knowledge.`
      ],
      tech: ['Java', 'Spring Boot', 'Redis', 'Angular', 'Tailwind CSS', 'Docker', 'Prometheus', 'Grafana', 'Google Maps API'],
      github: 'https://github.com/Thalisson-DEV/georoute',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-fullstack-activity-7354621537766760448-JRyc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: true
    },
    {
      title: 'Portifolio',
      description: $localize`:@@projectPortfolioDesc:My personal portfolio developed with Angular and Spring, highlighting my skills and projects.`,
      detailedDescription: $localize`:@@projectPortfolioDetailed:My personal professional portfolio developed to showcase my skills, experience, and software development projects. It serves as a central hub for my professional identity, demonstrating my proficiency in the Angular and Spring Boot ecosystem.`,
      objectives: [
        $localize`:@@projectPortfolioObj1:Present my work in a clean, modern, and accessible way.`,
        $localize`:@@projectPortfolioObj2:Showcase my projects and technical skills.`,
        $localize`:@@projectPortfolioObj3:Provide a contact channel for professional opportunities.`
      ],
      gains: [],
      tech: ['Java', 'Spring Boot', 'Typescript', 'Angular', 'Tailwind CSS', 'Docker', 'Github Actions'],
      github: 'https://github.com/Thalisson-DEV/portifolio',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-angular-activity-7411796301253844992-YGQx?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: true
    },
    {
      title: 'LangChain4j Integration',
      description: $localize`:@@projectLangchainDesc:Backend exploring RAG and Generative AI in the Java ecosystem.`,
      detailedDescription: $localize`:@@projectLangchainDetailed:A backend project exploring Retrieval-Augmented Generation (RAG) and Generative AI within the Java ecosystem. It integrates with Large Language Models (LLMs) to process natural language and provide intelligent responses based on context.`,
      objectives: [
        $localize`:@@projectLangchainObj1:Explore and master the integration of Java with modern AI tools.`,
        $localize`:@@projectLangchainObj2:Implement RAG patterns for enhanced context awareness.`,
        $localize`:@@projectLangchainObj3:Test integration with Gemini and other LLMs.`
      ],
      gains: [],
      tech: ['Java', 'Spring Boot', 'LangChain4j', 'Gemini'],
      github: 'https://github.com/Thalisson-DEV/langchain4j-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-langchain4j-activity-7409944520081117185-aSv0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: true
    },
    {
      title: 'Desafio Angular API',
      description: $localize`:@@projectAngularApiDesc:Backend for Angular developer technical challenge. Implementation of RESTful APIs.`,
      detailedDescription: $localize`:@@projectAngularApiDetailed:A backend application built as a technical challenge for an Angular developer position. It implements a robust set of RESTful APIs, focusing on best practices, data validation, and efficient database interactions.`,
      objectives: [
        $localize`:@@projectAngularApiObj1:Demonstrate solid knowledge of REST principles.`,
        $localize`:@@projectAngularApiObj2:Implement secure and efficient endpoints using Spring Boot.`,
        $localize`:@@projectAngularApiObj3:Showcase database integration and Docker containerization.`
      ],
      gains: [],
      tech: ['Java', 'Spring Boot', 'Redis', 'Docker', 'PostgreSQL'],
      github: 'https://github.com/Thalisson-DEV/desafio-angular-api',
      linkedin: 'https://www.linkedin.com/posts/thalisson-dami%C3%A3o_java-springboot-desenvolvedorbackend-activity-7383169955678093312-nyeh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFNEKNgBD06ou2uKKbE4OTAymtbAS9nJfbI',
      showIcons: true
    }
  ];
}
