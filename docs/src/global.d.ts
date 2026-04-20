import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export {};

declare global {
  interface Window {
    Eve?: {
      registerEveElements?: () => void;
    };
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'eve-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
        size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
        shape?: 'round' | 'square';
        dir?: 'ltr' | 'rtl';
        'icon-leading'?: string;
        'icon-trailing'?: string;
        toggle?: boolean;
        pressed?: boolean;
        'shape-toggle-swap'?: boolean;
      };
    }
  }
}
