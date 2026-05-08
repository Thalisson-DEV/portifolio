import { Component, Input, Output, EventEmitter, inject, Renderer2, OnChanges, SimpleChanges, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

export interface Project {
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
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (project) {
      <div class="modal-root">
        <!-- Backdrop -->
        <div class="modal-backdrop" (click)="close()"></div>

        <!-- Modal Card Container -->
        <div class="modal-wrapper" (click)="close()">
          <div class="modal-card" (click)="$event.stopPropagation()">

            <!-- Terminal Header -->
            <div class="terminal-header">
              <div class="controls">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
                <span class="path">cat {{ project.title.toLowerCase().replace(' ', '_') }}.md</span>
              </div>
              <button (click)="close()" class="close-btn" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body scroll-container font-sans">
              <div class="content-header">
                <h2 class="text-white text-2xl md:text-3xl font-bold mb-4">{{ project.title }}</h2>
                <div class="links flex flex-wrap gap-4 md:gap-6">
                  @if (project.github) {
                    <a [href]="project.github" target="_blank" class="link-item">
                      <i class="devicon-github-original"></i> [source_code]
                    </a>
                  }
                  @if (project.linkedin) {
                    <a [href]="project.linkedin" target="_blank" class="link-item">
                      <i class="devicon-linkedin-plain"></i> [post_details]
                    </a>
                  }
                </div>
              </div>

              <div class="info-section mt-8">
                <h3 class="section-title">>> runtime_environment</h3>
                <div class="flex flex-wrap gap-2 mt-4">
                  @for (tech of project.tech; track tech) {
                    <span class="tech-pill">{{ tech }}</span>
                  }
                </div>
              </div>

              @if (project.detailedDescription) {
                <div class="info-section mt-8">
                  <h3 class="section-title">>> project_summary</h3>
                  <p class="text-gray-400 leading-relaxed mt-4">{{ project.detailedDescription }}</p>
                </div>
              }

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                @if (project.objectives?.length) {
                  <div>
                    <h3 class="section-title">>> build_objectives</h3>
                    <ul class="mt-4 space-y-2">
                      @for (obj of project.objectives; track obj) {
                        <li class="flex items-start gap-2 text-gray-400 text-sm">
                          <span class="text-[#22c55e] font-mono">></span> {{ obj }}
                        </li>
                      }
                    </ul>
                  </div>
                }

                @if (project.gains?.length) {
                  <div>
                    <h3 class="section-title">>> optimization_results</h3>
                    <ul class="mt-4 space-y-2">
                      @for (gain of project.gains; track gain) {
                        <li class="flex items-start gap-2 text-gray-400 text-sm">
                          <span class="text-[#22c55e]">✓</span> {{ gain }}
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-root {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 200000;
      pointer-events: auto;
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: -1;
    }

    .modal-wrapper {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal-card {
      background-color: #0a1a0d;
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: 0.5rem;
      width: 100%;
      max-width: 56rem;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .terminal-header {
      background-color: #050f07;
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(34, 197, 94, 0.2);
    }

    .controls { display: flex; align-items: center; gap: 0.75rem; }
    .dot { width: 0.75rem; height: 0.75rem; border-radius: 9999px; }
    .red { background-color: #ff5f56; }
    .yellow { background-color: #ffbd2e; }
    .green { background-color: #27c93f; }

    .path {
      font-family: ui-monospace, monospace;
      font-size: 0.7rem;
      color: #4b5563;
      font-style: italic;
      margin-left: 0.5rem;
    }

    .close-btn {
      color: #6b7280;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      transition: color 0.2s;
    }
    .close-btn:hover { color: white; }
    .close-btn svg { width: 1.25rem; height: 1.25rem; }

    .modal-body {
      @apply p-6 md:p-10;
      overflow-y: auto;
      flex-grow: 1;
    }

    .scroll-container {
      scrollbar-width: thin;
      scrollbar-color: rgba(34, 197, 94, 0.3) transparent;
    }

    .section-title {
      font-family: ui-monospace, monospace;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #6b7280;
    }

    .link-item {
      font-family: ui-monospace, monospace;
      font-size: 0.75rem;
      color: #22c55e;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .link-item:hover { text-decoration: underline; }

    .tech-pill {
      padding: 0.2rem 0.6rem;
      border: 1px solid rgba(34, 197, 94, 0.2);
      background-color: rgba(34, 197, 94, 0.05);
      color: #22c55e;
      font-size: 0.65rem;
      font-family: ui-monospace, monospace;
      border-radius: 0.25rem;
    }
  `]
})
export class ProjectModalComponent implements OnChanges, OnDestroy {
  @Input() project: Project | null = null;
  @Output() closed = new EventEmitter<void>();

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  private document = inject(DOCUMENT);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']) {
      if (this.project) {
        this.moveToBody();
        this.lockScroll();
      } else {
        this.unlockScroll();
      }
    }
  }

  ngOnDestroy() {
    this.unlockScroll();
    this.removeFromBody();
  }

  close() {
    this.closed.emit();
  }

  private moveToBody() {
    // Move the entire modal to the end of <body> to escape any parent constraints
    this.renderer.appendChild(this.document.body, this.el.nativeElement);
  }

  private removeFromBody() {
    // el.nativeElement is automatically handled by Angular's destruction
    // but we ensure clean state here if needed
  }

  private lockScroll() {
    this.renderer.addClass(this.document.documentElement, 'modal-open');
  }

  private unlockScroll() {
    this.renderer.removeClass(this.document.documentElement, 'modal-open');
  }
}
