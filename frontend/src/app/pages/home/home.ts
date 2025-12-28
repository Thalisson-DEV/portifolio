import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
        <div class="absolute right-0 top-0 w-96 h-96 bg-neon-green rounded-full blur-[150px]"></div>
        <div class="absolute left-0 bottom-0 w-96 h-96 bg-blue-900 rounded-full blur-[150px]"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div class="text-center md:text-left order-2 md:order-1">
          <p class="font-mono text-neon-green mb-4 text-lg">System.out.println("Hello World! I am")</p>
          
          <h1 class="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight">
            Thalisson Damião
          </h1>
          
          <div class="h-10 mb-8 font-mono text-xl md:text-2xl text-gray-400 flex justify-center md:justify-start items-center">
            <span class="mr-2 text-neon-green">></span>
            <span class="text-white min-h-[30px]">{{ displayText }}</span>
            <span class="animate-pulse text-neon-green ml-1">|</span>
          </div>
          
          <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <a href="cv.pdf" download class="px-8 py-3 border border-neon-green text-neon-green font-mono hover:bg-neon-green hover:text-white transition rounded cursor-pointer">
              Download CV
            </a>
            <a href="https://github.com/Thalisson-DEV" target="_blank" class="px-6 py-3 bg-gray-800 text-white font-mono hover:bg-gray-700 transition rounded flex items-center justify-center gap-2">
              <i class="devicon-github-original"></i>
            </a>
            <a href="https://linkedin.com/in/thalisson-damião" target="_blank" class="px-6 py-3 bg-blue-700 text-white font-mono hover:bg-blue-600 transition rounded flex items-center justify-center gap-2">
              <i class="devicon-linkedin-plain"></i>
            </a>
          </div>
        </div>

        <div class="order-1 md:order-2 flex justify-center md:justify-end relative">
          <div class="absolute inset-0 bg-gradient-to-tr from-neon-green/20 to-transparent rounded-full blur-2xl transform scale-90"></div>
          <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-tr from-neon-green via-gray-800 to-gray-800 shadow-2xl">
            <div class="w-full h-full rounded-full overflow-hidden bg-gray-900 border-4 border-gray-900">
               <img src="me.jpg" alt="Thalisson" class="w-full h-full object-cover">
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  // Injeção manual para garantir atualização da tela
  private cdr = inject(ChangeDetectorRef);

  phrases: string[] = [
    "Back-End Developer",
    "Java & Spring Specialist",
    "Docker & Cloud Enthusiast",
    "Solving complex problems"
  ];
  
  displayText: string = "";
  
  private loopNum = 0;
  private isDeleting = false;
  private typingSpeed = 100; // Velocidade normal
  private deletingSpeed = 100; // Velocidade de apagar
  private pauseTime = 2000;   // Tempo parado lendo
  private timeoutId: any;

  ngOnInit() {
    this.tick();
  }

  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
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

    let delta = this.typingSpeed;

    if (this.isDeleting) {
      delta = this.deletingSpeed;
    }

    if (!this.isDeleting && this.displayText === fullText) {
      delta = this.pauseTime;
      this.isDeleting = true;
    } 
    else if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    this.timeoutId = setTimeout(() => {
      this.tick();
    }, delta);
  }
}