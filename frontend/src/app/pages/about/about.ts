import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-32 pb-40 px-4 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- LEFT COLUMN: Fullstack Narrative & Skills -->
        <div class="space-y-12">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <h2 class="text-3xl font-bold text-white tracking-tight">
                <span class="text-[#22c55e] font-mono text-xl mr-2">01.</span>
                <span i18n="@@aboutTitle">core_identity.sh</span>
              </h2>
              <div class="h-[1px] flex-grow bg-[#22c55e]/10 hidden md:block"></div>
            </div>

            <div class="space-y-4 text-gray-400 leading-relaxed font-sans text-lg">
              <p i18n="@@aboutBio1">
                Full Stack Developer specializing in <strong class="text-white">end-to-end scalable architectures</strong>.
                I bridge the gap between robust, high-concurrency backends in Java/Spring and pixel-perfect,
                high-performance reactive frontends using Angular and Next.js.
              </p>
              <p i18n="@@aboutBio2">
                My mission is to transform complex business requirements into elegant technical solutions.
                From designing mission-critical ERPs to orchestrating AI-driven SaaS pipelines, I focus on
                mathematical precision, security, and exceptional user experience across the entire stack.
              </p>
            </div>
          </div>

          <!-- Tech Stack Section -->
          <div class="space-y-6">
            <div class="flex justify-between items-center border-b border-[#22c55e]/10 pb-4">
              <div class="flex flex-col">
                <h3 class="text-sm font-mono uppercase tracking-[0.2em] text-gray-500" i18n="@@aboutTechStack">Technical Ecosystem</h3>
                <span class="text-[10px] text-[#22c55e]/60 font-mono mt-1">> sudo run fullstack_lifecycle.bin</span>
              </div>

              <button
                (click)="toggleView()"
                class="text-[10px] font-mono uppercase tracking-wider text-gray-500 hover:text-[#22c55e] transition-all flex items-center gap-2 group px-3 py-1 border border-transparent hover:border-[#22c55e]/20 rounded"
                [attr.aria-label]="showIcons ? 'Switch to text view' : 'Switch to icon view'">
                <i [class]="showIcons ? 'devicon-bash-plain' : 'devicon-devicon-plain'" class="text-sm"></i>
                <span *ngIf="showIcons" i18n="@@aboutViewNames">View Names</span>
                <span *ngIf="!showIcons" i18n="@@aboutViewIcons">View Icons</span>
              </button>
            </div>

            <div class="min-h-[160px]">
              <!-- Text Grid -->
              <div *ngIf="!showIcons" class="grid grid-cols-2 md:grid-cols-3 gap-3 animate-fade-in">
                @for (skill of skills; track skill) {
                  <div class="px-3 py-2 bg-[#0a1a0d] border border-[#22c55e]/10 rounded font-mono text-xs text-[#22c55e]/80 hover:border-[#22c55e]/40 hover:text-[#22c55e] transition-all cursor-default flex items-center gap-2 group">
                    <span class="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">></span>
                    {{ skill }}
                  </div>
                }
              </div>

              <!-- Icons Flex -->
              <div *ngIf="showIcons" class="flex flex-wrap gap-8 animate-fade-in items-center">
                @for (skill of skills; track skill) {
                  <div class="group relative flex flex-col items-center" tabindex="0" [attr.aria-label]="skill">
                    <div class="w-14 h-14 flex items-center justify-center bg-[#0a1a0d] border border-[#22c55e]/5 rounded-lg group-hover:border-[#22c55e]/30 transition-all duration-300 group-hover:-translate-y-1">
                      <i *ngIf="getIconClass(skill)"
                         [class]="getIconClass(skill) + ' text-3xl text-gray-500 group-hover:text-[#22c55e] transition-colors duration-300'"
                         aria-hidden="true">
                      </i>
                      <span *ngIf="!getIconClass(skill)" class="text-[10px] text-gray-500 font-mono text-center px-1">
                        {{ skill }}
                      </span>
                    </div>

                    <span class="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-all text-[9px] font-mono text-[#22c55e] uppercase tracking-widest pointer-events-none">
                      {{ skill }}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Technical ID Card -->
        <div class="space-y-12">
          <!-- The "Identity" Terminal -->
          <div class="bg-[#0a1a0d] border border-[#22c55e]/10 rounded-lg overflow-hidden shadow-2xl font-mono text-sm group hover:border-[#22c55e]/20 transition-all duration-500">
            <div class="bg-[#050f07] px-4 py-3 flex items-center justify-between border-b border-[#22c55e]/10">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]/50 group-hover:bg-[#ff5f56] transition-colors"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]/50 group-hover:bg-[#ffbd2e] transition-colors"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]/50 group-hover:bg-[#27c93f] transition-colors"></div>
              </div>
              <span class="text-[10px] text-gray-600 italic tracking-wider">thalisson.dev/fullstack_architect.java</span>
              <div class="w-8"></div>
            </div>

            <div class="p-8 space-y-6">
              <pre class="leading-relaxed"><code class="text-gray-400"><span class="text-[#ff7b72]">public class</span> <span class="text-[#d2a8ff]">Thalisson</span> <span class="text-[#ff7b72]">implements</span> <span class="text-[#d2a8ff]">FullStackArchitect</span> {{ '{' }}

  <span class="text-[#79c0ff]">@CurrentFocus</span>
  <span class="text-[#ff7b72]">private final</span> String mission = <span class="text-[#a5d6ff]">"High-Performance Architectures"</span>;

  <span class="text-[#ff7b72]">public void</span> <span class="text-[#d2a8ff]">build</span>(Requirement req) {{ '{' }}
    <span class="text-[#79c0ff]">Architect</span>.design(req)
             .develop()
             .optimize()
             .ship();
  {{ '}' }}
{{ '}' }}</code></pre>
            </div>
          </div>

          <!-- Activity/Contributions -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <i class="devicon-github-original text-gray-600 text-lg"></i>
              <h3 class="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">> git_activity --consistency</h3>
            </div>
            <div class="bg-[#0a1a0d] p-6 rounded-lg border border-[#22c55e]/10 overflow-hidden flex justify-center group hover:border-[#22c55e]/20 transition-all">
                <img src="https://ghchart.rshah.org/22c55e/Thalisson-DEV"
                     alt="Thalisson-DEV's Github activity chart"
                     class="opacity-70 group-hover:opacity-100 transition-opacity duration-500 filter grayscale group-hover:grayscale-0" />
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AboutComponent {

  showIcons = true;

  toggleView() {
    this.showIcons = !this.showIcons;
  }

  skills = [
    'Java 21', 'Spring Boot 3', 'Node.js', 'Fastify 5',
    'Next.js 15', 'Virtual Threads', 'Supabase', 'PostgreSQL 17',
    'Redis', 'Claude AI', 'Angular 21', 'PWA', 'Astro 5'
  ];

  techIconMap: { [key: string]: string } = {
    'Java 21': 'devicon-java-plain',
    'Spring Boot 3': 'devicon-spring-original',
    'Node.js': 'devicon-nodejs-plain',
    'Fastify 5': 'devicon-nodejs-plain',
    'Next.js 15': 'devicon-nextjs-plain',
    'Virtual Threads': 'devicon-java-plain',
    'Supabase': 'devicon-supabase-plain',
    'PostgreSQL 17': 'devicon-postgresql-plain',
    'Redis': 'devicon-redis-plain',
    'Claude AI': '',
    'Angular 21': 'devicon-angularjs-plain',
    'PWA': 'devicon-javascript-plain',
    'Astro 5': 'devicon-astro-plain'
  };

  getIconClass(skillName: string): string {
    return this.techIconMap[skillName] || '';
  }
}
