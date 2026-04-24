import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export {};

declare global {
  interface Window {
    Eve?: {
      registerElements?: () => void;
    };
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'lib-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
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
      'lib-button-icon': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'standard' | 'filled' | 'tonal' | 'outlined' | 'elevated';
        size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
        width?: 'default' | 'narrow' | 'wide';
        shape?: 'round' | 'square';
        icon?: 'check' | 'close' | 'menu' | 'chevron-right';
        toggle?: boolean;
        pressed?: boolean;
      };
      'lib-button-split': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'elevated' | 'filled' | 'tonal' | 'outlined';
        size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
        'icon-leading'?: 'check' | 'close' | 'menu';
        'secondary-aria-label'?: string;
        'selected-trailing'?: boolean;
        'equal-parts'?: boolean;
      };
      'lib-button-group': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'standard' | 'connected';
        size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
        'selection-mode'?: 'one-select' | 'multi-select';
      };
      'lib-navigation-card': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        title?: string;
        subtitle?: string;
        href?: string;
        'icon-leading'?: 'check' | 'close' | 'menu' | 'chevron-right';
        'icon-trailing'?: 'check' | 'close' | 'menu' | 'chevron-right';
      };
      'lib-card': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'elevated' | 'filled' | 'outlined';
        orientation?: 'vertical' | 'horizontal';
        layout?: 'default' | 'vertical-list' | 'mosaic' | 'staggered';
        interactive?: boolean;
        href?: string;
        expandable?: boolean;
        expanded?: boolean;
        swipe?: boolean;
        'pickup-move'?: boolean;
        'media-first'?: boolean;
        'media-bleed'?: boolean;
      };
      'lib-shape': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
        'aria-label'?: string;
        color?: string;
        rgba?: string;
        motion?: 'none' | 'emphasized' | 'emphasized-recoil' | 'spin' | 'spin-inverse';
        recoil?: boolean;
      };
      'lib-loading-indicator': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'default' | 'contained';
        duration?: string;
        paused?: boolean;
        'aria-label'?: string;
      };
      'lib-text-field': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'filled' | 'outlined';
        label?: string;
        value?: string;
        placeholder?: string;
        type?: string;
        name?: string;
        autocomplete?: string;
        inputmode?: string;
        supportingText?: string;
        errorText?: string;
        error?: boolean;
        prefixText?: string;
        suffixText?: string;
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        minlength?: number | string;
        maxlength?: number | string;
        pattern?: string;
        min?: number | string;
        max?: number | string;
        step?: number | string;
        'text-align'?: 'left' | 'right';
        dir?: 'ltr' | 'rtl';
        'aria-label'?: string;
        'supporting-text'?: string;
        'error-text'?: string;
        'prefix-text'?: string;
        'suffix-text'?: string;
        'password-toggle'?: boolean | string;
        'password-generate'?: boolean | string;
        'password-min-length'?: number | string;
        'password-min-lower'?: number | string;
        'password-min-upper'?: number | string;
        'password-min-digit'?: number | string;
        'password-min-special'?: number | string;
        'icon-leading'?:
          | 'check'
          | 'close'
          | 'menu'
          | 'chevron-right'
          | 'visibility'
          | 'visibility-off'
          | 'refresh';
        'icon-trailing'?:
          | 'check'
          | 'close'
          | 'menu'
          | 'chevron-right'
          | 'visibility'
          | 'visibility-off'
          | 'refresh';
      };
    }
  }
}
