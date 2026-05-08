import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent, Project } from './project-modal';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  template: `
    <div class="pt-32 pb-40 px-4 max-w-7xl mx-auto animate-fade-in">

      <!-- Section Header -->
      <div class="space-y-6 mb-16">
        <div class="flex items-center gap-4">
          <h2 class="text-3xl font-bold text-white tracking-tight">
            <span class="text-[#22c55e] font-mono text-xl mr-2">02.</span>
            <span i18n="@@projectsTitle">deployment_logs.sh</span>
          </h2>
          <div class="h-[1px] flex-grow bg-[#22c55e]/10 hidden md:block"></div>
        </div>
        <div class="flex items-center gap-2 font-mono text-sm">
          <span class="text-[#22c55e]">$</span>
          <span class="text-gray-500">ls ~/projects --detailed</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (project of projects; track project.title) {
          <div class="group flex flex-col h-full bg-[#0a1a0d] border border-[#22c55e]/10 rounded-lg overflow-hidden hover:border-[#22c55e]/30 transition-all duration-300">
            
            <!-- Terminal Header -->
            <div class="bg-[#050f07] px-4 py-2 flex items-center justify-between border-b border-[#22c55e]/10">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/50 group-hover:bg-[#ff5f56] transition-colors"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/50 group-hover:bg-[#ffbd2e] transition-colors"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#27c93f]/50 group-hover:bg-[#27c93f] transition-colors"></div>
              </div>
              <span class="text-[10px] text-gray-600 font-mono italic">~/projects/{{ project.title.toLowerCase().replace(' ', '-') }}</span>
              <div class="flex items-center gap-2">
                <button
                  (click)="toggleProjectView(project); $event.stopPropagation()"
                  class="text-gray-600 hover:text-[#22c55e] transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
                  [attr.aria-label]="project.showIcons ? 'Switch to text view' : 'Switch to icon view'"
                  [title]="project.showIcons ? 'Ver como texto' : 'Ver como ícones'">
                  <i [class]="project.showIcons ? 'devicon-bash-plain' : 'devicon-devicon-plain'" class="text-xs"></i>
                </button>
                @if (project.github) {
                  <a [href]="project.github" target="_blank" (click)="$event.stopPropagation()" class="text-gray-600 hover:text-[#22c55e] transition-colors">
                    <i class="devicon-github-original text-xs"></i>
                  </a>
                }
                @if (project.linkedin) {
                  <a [href]="project.linkedin" target="_blank" (click)="$event.stopPropagation()" class="text-gray-600 hover:text-[#22c55e] transition-colors">
                    <i class="devicon-linkedin-plain text-xs"></i>
                  </a>
                }
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6 flex flex-col flex-grow space-y-4">
              <div class="flex justify-between items-start">
                <i class="devicon-folder-open-plain text-3xl text-[#22c55e]/60" aria-hidden="true"></i>
              </div>

              <div class="space-y-2">
                <h3 class="text-xl font-bold text-white group-hover:text-[#22c55e] transition-colors cursor-pointer" (click)="selectedProject = project">
                  {{ project.title }}
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {{ project.description }}
                </p>
              </div>

              <!-- Tech Stack & Action -->
              <div class="mt-auto pt-4 space-y-6">
                <div class="min-h-[32px]">
                  @if (!project.showIcons) {
                    <div class="flex flex-wrap gap-2 animate-fade-in">
                      @for (tech of project.tech; track tech) {
                        <span class="tech-tag">{{ tech }}</span>
                      }
                    </div>
                  } @else {
                    <div class="flex flex-wrap gap-3 items-center animate-fade-in">
                      @for (tech of project.tech; track tech) {
                        <div class="group/tech relative flex items-center" tabindex="0" [attr.aria-label]="tech">
                          <i [class]="getIconClass(tech) + ' text-lg text-gray-500 hover:text-[#22c55e] transition-colors cursor-help'"></i>
                          <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tech:opacity-100 transition-opacity text-[9px] font-mono text-[#22c55e] bg-[#050f07] border border-[#22c55e]/20 px-1.5 py-0.5 rounded whitespace-nowrap z-10 pointer-events-none">
                            {{ tech }}
                          </span>
                        </div>
                      }
                    </div>
                  }
                </div>

                <button (click)="selectedProject = project" class="btn-details">
                  view_details()
                </button>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Modular Project Detail Modal -->
      <app-project-modal 
        [project]="selectedProject" 
        (closed)="selectedProject = null">
      </app-project-modal>

    </div>
  `,
  styles: [`
    .tech-tag {
      @apply px-2 py-0.5 border border-[#22c55e]/20 bg-[#22c55e]/5 text-[#22c55e]/80 text-[10px] font-mono rounded transition-all duration-200 cursor-default;
    }
    .tech-tag:hover {
      @apply bg-[#22c55e]/10 border-[#22c55e]/40 text-[#22c55e];
    }

    .btn-details {
      @apply px-4 py-2 border border-[#22c55e]/30 text-[#22c55e] font-mono text-xs hover:bg-[#22c55e] hover:text-[#050f07] transition-all duration-200 rounded uppercase tracking-wider bg-transparent cursor-pointer;
    }

    .animate-fade-in {
      animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: none; }
    }
  `]
})
export class ProjectsComponent {
  selectedProject: Project | null = null;

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
