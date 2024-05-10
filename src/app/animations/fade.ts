import { animate, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms 0s ease-in-out', style({ opacity: '*' })),
  ]),
  transition(':leave', [animate('150ms 0s ease-in-out', style({ opacity: '0' }))]),
]);
