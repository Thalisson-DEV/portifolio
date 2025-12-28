import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-24 pb-40 px-4 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <div class="space-y-8">
          <div>
            <h2 class="text-3xl font-bold text-white mb-4"><span class="text-neon-green">01.</span> About-me</h2>
            <p class="text-gray-400 leading-relaxed">
              Desenvolvedor Back-End com forte base em <strong class="text-white">Java e ecossistema Spring</strong>. 
              Vim da área de Dados e Segurança do Trabalho, o que me deu uma visão analítica única.
              Atualmente transformo regras de negócio complexas em código limpo, testável e escalável.
              Apaixonado por otimizar queries SQL e criar APIs RESTful robustas.
            </p>
          </div>

          <div>
            <h3 class="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div class="flex flex-wrap gap-3">
              <span *ngFor="let skill of skills" class="px-3 py-1 bg-gray-800 text-neon-green border border-gray-700 rounded font-mono text-sm hover:border-neon-green transition">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-terminal-gray border border-gray-700 rounded-lg overflow-hidden shadow-2xl font-mono text-sm md:text-base h-auto w-full">
          <div class="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="ml-2 text-xs text-gray-400">Thalisson.java</span>
          </div>
          
          <div class="p-6 pb-12 overflow-x-auto">
            <pre><code><span class="text-code-keyword">public class</span> <span class="text-yellow-400">Thalisson</span> <span class="text-code-keyword">extends</span> <span class="text-code-class">BackendDev</span> &#123;
  
  <span class="text-code-keyword">private final</span> String focus = <span class="text-code-string">"Java & Spring"</span>;
  <span class="text-code-keyword">private</span> String[] hardSkills = &#123;
    <span class="text-code-string">"Java"</span>, <span class="text-code-string">"Spring Boot"</span>, <span class="text-code-string">"Docker"</span>,
    <span class="text-code-string">"PostgreSQL"</span>, <span class="text-code-string">"LangChain4j"</span>, <span class="text-code-string">"Git & GitHub"</span>,
    <span class="text-code-string">"Redis"</span>, <span class="text-code-string">"Angular"</span>
  &#125;;

  <span class="text-code-keyword">public</span> <span class="text-code-class">void</span> <span class="text-blue-400">code</span>() &#123;
    <span class="text-code-keyword">while</span> (alive) &#123;
      eat();
      sleep();
      <span class="text-purple-400">createSolutions</span>();
    &#125;
  &#125;
&#125;</code></pre>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h3 class="text-xl font-bold text-white mb-6 font-mono">> git_contributions --year 2025</h3>
        <div class="bg-terminal-gray p-4 rounded-lg border border-gray-700 overflow-x-auto flex justify-center">
            <img src="https://ghchart.rshah.org/2ea043/Thalisson-DEV" alt="Thalisson-DEV's Github chart" />
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {
  skills = [
    'Java', 'Spring Boot', 'Spring Security', 'JPA/Hibernate',
    'Docker', 'PostgreSQL', 'Redis', 'Git Flow',
    'Angular', 'TypeScript', 'Power Apps'
  ];
}