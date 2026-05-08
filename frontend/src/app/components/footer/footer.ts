import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="w-full bg-[#050f07] border-t border-[#22c55e]/10 py-8 px-4 relative z-10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[11px]">

        <!-- Left: Status & Identity -->
        <div class="flex items-center gap-4 text-gray-500">
          <div class="flex gap-1">
            <div class="w-1.5 h-1.5 rounded-full bg-[#ff5f56]/30"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]/30"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-[#27c93f]/30"></div>
          </div>
          <span class="hidden sm:inline">~/thalisson/production</span>
          <span class="text-[#22c55e]/40">|</span>
          <span>&copy; 2026 THALISSON_DAMIAO</span>
        </div>

        <!-- Right: Action & Heart -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-gray-500">
            <span class="w-1 h-1 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span class="italic">runtime: stable</span>
          </div>
          <span class="text-[#22c55e]/40">|</span>
          <div class="text-[#22c55e] hover:text-white transition-colors cursor-default group">
            made_with_<span class="group-hover:animate-pulse">☕</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}
