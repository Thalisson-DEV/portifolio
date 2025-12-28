import { trigger, transition, style, query, animate } from '@angular/animations';

export const fadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    // Define que o elemento entrando começa invisível
    query(':enter', [style({ opacity: 0 })], { optional: true }),

    // Esconde o elemento que está saindo
    query(':leave', [animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))], { optional: true }),

    // Mostra o elemento novo
    query(':enter', [animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(0px)' }))], { optional: true })
  ])
]);