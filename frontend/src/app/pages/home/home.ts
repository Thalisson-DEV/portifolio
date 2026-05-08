import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col pt-16 md:pt-20">

      <!-- Main Hero Content -->
      <div class="flex-grow flex items-center justify-center px-4 max-w-7xl mx-auto w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">

          <!-- LEFT COLUMN: Text Content -->
          <div class="space-y-6">
            <!-- Prompt Line -->
            <div class="flex items-center justify-between font-mono text-sm">
              <div class="flex items-center gap-2">
                <span class="text-[#22c55e]">$</span>
                <span class="text-gray-500">~/portfolio</span>
              </div>
              <div class="px-2 py-0.5 border border-[#22c55e]/30 rounded-full flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
                <span class="text-[10px] text-[#22c55e] uppercase tracking-wider">available</span>
              </div>
            </div>

            <div class="space-y-2">
              <p class="font-mono text-gray-500 text-sm">System.out.println("Hello World! I am")</p>
              <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">
                Thalisson Damião
              </h1>
            </div>

            <div class="space-y-4">
              <div class="font-mono text-xl md:text-2xl flex items-center min-h-[1.5em]">
                <span class="text-[#22c55e] mr-3">></span>
                <span class="text-white">{{ displayText }}</span>
                <span class="cursor ml-1"></span>
              </div>
              <p class="font-mono text-gray-400/50 text-sm">
                Java • Spring Boot • Node.js • Angular • TypeScript
              </p>
            </div>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2 pt-2">
              @for (tech of mainTechs; track tech) {
                <span class="tech-tag">
                  {{ tech }}
                </span>
              }
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 pt-6">
              <a href="cv.pdf" download class="btn-cv" i18n="@@homeDownloadCV">
                Download CV
              </a>
              <div class="flex gap-3">
                <a href="https://github.com/Thalisson-DEV" target="_blank" aria-label="Visit my GitHub Profile" class="btn-icon">
                  <i class="devicon-github-original text-xl" aria-hidden="true"></i>
                </a>
                <a href="https://linkedin.com/in/thalisson-damião" target="_blank" aria-label="Visit my LinkedIn Profile" class="btn-icon">
                  <i class="devicon-linkedin-plain text-xl" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Terminal + Stats -->
          <div class="space-y-8 hidden lg:block">
            <!-- Fake Terminal -->
            <div class="bg-[#0a1a0d] border border-[#22c55e]/10 rounded-lg overflow-hidden shadow-2xl font-mono text-sm">
              <div class="bg-[#050f07] px-4 py-2 flex items-center justify-between border-b border-[#22c55e]/10">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span class="text-[10px] text-gray-500 italic">thalisson @.idea/portifolio-thalisson-dev.iml ~ bash</span>
                <div class="w-12"></div> <!-- Spacer for balance -->
              </div>
              <div class="p-5 space-y-4">
                <div class="space-y-1">
                  <div class="flex gap-2 text-gray-400">
                    <span class="text-[#22c55e]">$</span>
                    <span>whoami</span>
                  </div>
                  <div class="text-white pl-4">Thalisson Damião</div>
                </div>

                <div class="space-y-1">
                  <div class="flex gap-2 text-gray-400">
                    <span class="text-[#22c55e]">$</span>
                    <span>cat stack.json</span>
                  </div>
                  <div class="pl-4 font-mono text-sm leading-relaxed">
                    <span class="text-gray-400">{{ '{' }}</span>
                    <div class="pl-4">
                      <span class="text-code-keyword">"backend"</span><span class="text-gray-400">: [</span>
                      @for (item of stack.backend; track item; let last = $last) {
                        <span class="text-code-string">"{{ item }}"</span><span class="text-gray-400">{{ last ? '' : ', ' }}</span>
                      }
                      <span class="text-gray-400">],</span>
                    </div>
                    <div class="pl-4">
                      <span class="text-code-keyword">"frontend"</span><span class="text-gray-400">: [</span>
                      @for (item of stack.frontend; track item; let last = $last) {
                        <span class="text-code-string">"{{ item }}"</span><span class="text-gray-400">{{ last ? '' : ', ' }}</span>
                      }
                      <span class="text-gray-400">],</span>
                    </div>
                    <div class="pl-4">
                      <span class="text-code-keyword">"database"</span><span class="text-gray-400">: [</span>
                      @for (item of stack.database; track item; let last = $last) {
                        <span class="text-code-string">"{{ item }}"</span><span class="text-gray-400">{{ last ? '' : ', ' }}</span>
                      }
                      <span class="text-gray-400">]</span>
                    </div>
                    <span class="text-gray-400">{{ '}' }}</span>
                  </div>
                </div>

                <div class="space-y-1">
                  <div class="flex gap-2 text-gray-400">
                    <span class="text-[#22c55e]">$</span>
                    <span>git log --oneline -1</span>
                  </div>
                  <div class="text-gray-300 pl-4">
                    <span class="text-yellow-500">f2a8bd4</span> (HEAD -> main) feat: implement Kore AI Resume Optimizer
                    <span class="cursor ml-1"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4">
              @for (stat of stats; track stat.label) {
                <div class="stat-card">
                  <div class="text-2xl font-bold text-[#22c55e] font-mono leading-none mb-1">{{ stat.value }}</div>
                  <div class="text-[10px] text-gray-500 uppercase tracking-widest">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>

        </div>
      </div>

      <!-- HERO FOOTER: Anchor Navigation -->
      <div class="border-y border-[#22c55e]/10 bg-[#050f07]/50 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#22c55e]/10">
          @for (nav of heroNavItems; track nav.id) {
            <div class="hero-nav-cell group" (click)="scrollTo(nav.id)">
              <div class="flex flex-col">
                <span class="text-[10px] text-gray-600 font-mono mb-1">{{ nav.num }}</span>
                <span class="text-sm text-gray-400 group-hover:text-[#22c55e] transition-colors duration-200">{{ nav.label }}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          }
        </div>
      </div>

    </div>
  `,
  styles: [`
    .tech-tag {
      @apply px-2.5 py-1 border border-[#22c55e]/30 bg-[#22c55e]/5 text-[#22c55e] text-[11px] font-mono rounded transition-all duration-200 cursor-default;
    }
    .tech-tag:hover {
      @apply bg-[#22c55e]/10 -translate-y-0.5;
    }

    .btn-cv {
      @apply px-8 py-3 border border-[#22c55e] text-[#22c55e] font-mono text-sm hover:bg-[#22c55e] hover:text-[#050f07] transition-all duration-200 rounded active:scale-95;
    }

    .btn-icon {
      @apply w-12 h-12 flex items-center justify-center border border-[#22c55e]/10 bg-[#22c55e]/5 text-gray-400 hover:border-[#22c55e] hover:text-[#22c55e] transition-all duration-200 rounded active:scale-95;
    }

    .stat-card {
      @apply bg-[#0a1a0d] border border-[#22c55e]/10 rounded-md p-4 transition-all duration-300;
    }
    .stat-card:hover {
      @apply border-[#22c55e]/40;
    }
    .stat-card:hover div:first-child {
      @apply scale-105 transform origin-left;
    }

    .hero-nav-cell {
      @apply p-6 flex items-center justify-between cursor-pointer hover:bg-[#22c55e]/5 transition-all duration-200;
    }

    /* Blinking Cursor override if not in global */
    @media (prefers-reduced-motion: no-preference) {
      @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      .cursor {
        display: inline-block;
        width: 2px;
        height: 1.1em;
        background: #22c55e;
        vertical-align: middle;
        animation: blink 0.9s step-end infinite;
      }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  stack = {
    backend: ['Java', 'Spring Boot', 'Fastify'],
    frontend: ['Angular', 'Next.js'],
    database: ['PostgreSQL', 'Redis', 'Supabase']
  };

  phrases: string[] = [
    $localize`:@@homeRoleBackend:Back-End Developer`,
    $localize`:@@homeRoleJava:Java & Spring Specialist`,
    $localize`:@@homeRoleSaas:SaaS & AI Architect`,
    $localize`:@@homeRoleDocker:Docker & Cloud Enthusiast`,
    $localize`:@@homeRoleErp:Building Strategic ERPs`,
    $localize`:@@homeRoleSolving:Solving complex problems`
  ];

  mainTechs = ['Java', 'Spring Boot', 'Next.js', 'Fastify', 'Angular', 'Supabase'];

  stats = [
    { value: '1.5+', label: $localize`:@@homeStatExp:years experience` },
    { value: '12+', label: $localize`:@@homeStatProjects:projects completed` },
    { value: '1', label: $localize`:@@homeStatSaas:SaaS launched` },
    { value: '∞', label: $localize`:@@homeStatCoffee:cups of coffee` }
  ];

  heroNavItems = [
    { id: 'about', num: '// 01', label: $localize`:@@navAbout:_about-me` },
    { id: 'projects', num: '// 02', label: $localize`:@@navProjects:_projects` },
    { id: 'contact', num: '// 03', label: $localize`:@@navContact:_contact-me` },
    { id: 'hello', num: '// 04', label: 'back_to_top' }
  ];

  displayText: string = "";
  private loopNum = 0;
  private isDeleting = false;
  private timeoutId: any;

  ngOnInit() {
    this.tick();
  }

  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  tick() {
    const i = this.loopNum % this.phrases.length;
    const fullText = this.phrases[i];

    if (this.isDeleting) {
      this.displayText = fullText.substring(0, this.displayText.length - 1);
    } else {
      this.displayText = fullText.substring(0, this.displayText.length + 1);
    }

    this.cdr.detectChanges();

    let delta = 100;
    if (this.isDeleting) delta = 50;

    if (!this.isDeleting && this.displayText === fullText) {
      delta = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    this.timeoutId = setTimeout(() => this.tick(), delta);
  }
}
