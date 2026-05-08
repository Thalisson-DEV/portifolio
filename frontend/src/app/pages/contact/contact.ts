import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

interface RestException {
  timestamp: string;
  status: number;
  error: string;
  path: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pt-32 pb-40 px-4 max-w-7xl mx-auto animate-fade-in">
      
      <!-- Section Header -->
      <div class="space-y-6 mb-16">
        <div class="flex items-center gap-4">
          <h2 class="text-3xl font-bold text-white tracking-tight">
            <span class="text-[#22c55e] font-mono text-xl mr-2">03.</span>
            <span i18n="@@contactTitle">establish_connection.sh</span>
          </h2>
          <div class="h-[1px] flex-grow bg-[#22c55e]/10 hidden md:block"></div>
        </div>
        <div class="flex items-center gap-2 font-mono text-sm">
          <span class="text-[#22c55e]">$</span>
          <span class="text-gray-500">nc -vz portfolio.api 8080</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <!-- LEFT COLUMN: Identity & Status -->
        <div class="space-y-12">
          <div class="space-y-6">
            <h3 class="text-sm font-mono uppercase tracking-[0.2em] text-gray-500" i18n="@@contactDescTitle">Availability Status</h3>
            <div class="bg-[#0a1a0d] border border-[#22c55e]/10 rounded-lg p-8 font-mono text-sm space-y-4 shadow-2xl">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
                <span class="text-[#22c55e] font-bold">SYSTEM_READY</span>
              </div>
              <p class="text-gray-400 leading-relaxed" i18n="@@contactDesc">
                Currently open to <span class="text-white">strategic opportunities</span> as a Full Stack Developer. 
                My inbox is monitored and ready for incoming packets.
              </p>
              <div class="pt-4 space-y-3">
                <div class="flex items-center gap-3 text-gray-500 hover:text-[#22c55e] transition-colors group">
                  <i class="devicon-github-original text-lg"></i>
                  <a href="https://github.com/Thalisson-DEV" target="_blank" class="group-hover:underline">github.com/Thalisson-DEV</a>
                </div>
                <div class="flex items-center gap-3 text-gray-500 hover:text-[#22c55e] transition-colors group">
                  <i class="devicon-linkedin-plain text-lg"></i>
                  <a href="https://linkedin.com/in/thalisson-damião" target="_blank" class="group-hover:underline">linkedin.com/in/thalisson-damião</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Command Hint -->
          <div class="hidden lg:block space-y-2 opacity-30">
            <p class="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Incoming transmission decrypted:</p>
            <p class="text-xs font-mono text-[#22c55e]">"The best way to predict the future is to implement it."</p>
          </div>
        </div>

        <!-- RIGHT COLUMN: Command Center (Form) -->
        <div class="space-y-8">
          <div class="bg-[#0a1a0d] border border-[#22c55e]/10 rounded-lg overflow-hidden shadow-2xl group hover:border-[#22c55e]/20 transition-all duration-500">
            <div class="bg-[#050f07] px-4 py-3 flex items-center justify-between border-b border-[#22c55e]/10">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]/50 group-hover:bg-[#ff5f56] transition-colors"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]/50 group-hover:bg-[#ffbd2e] transition-colors"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]/50 group-hover:bg-[#27c93f] transition-colors"></div>
              </div>
              <span class="text-[10px] text-gray-600 font-mono italic">ssh contact@thalisson.dev</span>
              <div class="w-8"></div>
            </div>

            <form (ngSubmit)="sendMessage()" class="p-8 space-y-6">
              <div class="space-y-2">
                <label for="name" class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">01. sender_identity</label>
                <input type="text" id="name" [(ngModel)]="form.name" name="name" placeholder="Name" [disabled]="isLoading"
                       class="contact-input" aria-required="true">
              </div>

              <div class="space-y-2">
                <label for="email" class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">02. return_address</label>
                <input type="email" id="email" [(ngModel)]="form.email" name="email" placeholder="Email" [disabled]="isLoading"
                       class="contact-input" aria-required="true">
              </div>

              <div class="space-y-2">
                <label for="message" class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">03. payload_content</label>
                <textarea id="message" [(ngModel)]="form.message" name="message" rows="4" placeholder="Your message here..." [disabled]="isLoading"
                          class="contact-input min-h-[120px]" aria-required="true"></textarea>
              </div>

              <button type="submit" [disabled]="isLoading" class="btn-send">
                <span *ngIf="isLoading" class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#050f07] rounded-full animate-ping"></span>
                  Sending Packet...
                </span>
                <span *ngIf="!isLoading">exec send_message.bin</span>
              </button>
            </form>
          </div>

          <!-- Console Output -->
          <div *ngIf="logMessage" class="bg-[#050f07] rounded-lg border border-[#22c55e]/10 overflow-hidden animate-fade-in shadow-xl">
             <div class="bg-[#0a1a0d] px-4 py-1.5 border-b border-[#22c55e]/10 flex items-center justify-between">
                <span class="text-[9px] font-mono text-gray-600">CONSOLE_OUTPUT</span>
                <div class="flex gap-1">
                   <div class="w-1.5 h-1.5 rounded-full bg-[#22c55e]/30"></div>
                </div>
             </div>
             <div class="p-4 font-mono text-xs space-y-2">
                <div class="flex gap-2 text-gray-500">
                  <span class="text-[#22c55e]">$</span>
                  <span>tail -f /var/log/mail.log</span>
                </div>
                <pre [ngClass]="isError ? 'text-red-400' : 'text-[#a5d6ff]'" class="whitespace-pre-wrap leading-relaxed opacity-90">{{ logMessage }}</pre>
             </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .contact-input {
      @apply w-full bg-[#050f07] border border-[#22c55e]/10 rounded p-4 text-white focus:border-[#22c55e]/40 focus:outline-none font-mono text-sm transition-all duration-300 placeholder:text-gray-700 disabled:opacity-50;
    }

    .btn-send {
      @apply w-full py-4 border border-[#22c55e] text-[#22c55e] font-mono text-sm hover:bg-[#22c55e] hover:text-[#050f07] transition-all duration-300 rounded active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest;
    }

    .animate-fade-in {
      animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };
  logMessage = '';
  isError = false;
  isLoading = false;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  sendMessage() {
    if(!this.form.email.includes("@") || !this.form.email.includes(".")) {
      this.setErrorLog("Validation Failed", "Invalid Email");
      return;
    }
    if(!this.form.name || !this.form.email || !this.form.message) {
        this.setErrorLog("Validation Failed", "All fields are required locally.");
        return;
    }

    this.isLoading = true;
    this.isError = false;
    this.logMessage = `> Sending packet to server...`;

    this.contactService.sendMessage(this.form)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response: any) => {
          this.isError = false;
          const msg = response.message || "Email sent successfully!";
          this.logMessage = `{ status: 200, message: "${msg}" }`;

          setTimeout(() => {
             this.form = { name: '', email: '', message: '' };
             this.cdr.detectChanges();
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.isError = true;
          console.error('API Error:', err);

          if (err.error && typeof err.error === 'object' && err.error.timestamp) {
              const apiError = err.error as RestException;
              this.logMessage = `{
  "timestamp": "${apiError.timestamp}",
  "status": ${apiError.status},
  "error": "${apiError.error}",
  "path": "${apiError.path}"
}`;
          } else {
              this.logMessage = `{
  "status": ${err.status},
  "error": "${err.statusText || 'Unknown Error'}",
  "detail": "Unexpected response structure."
}`;
          }
          this.cdr.detectChanges();
        }
      });
  }

  private setErrorLog(title: string, detail: string) {
    this.isError = true;
    this.logMessage = `{
  "error": "${title}",
  "detail": "${detail}"
}`;
  }
}
