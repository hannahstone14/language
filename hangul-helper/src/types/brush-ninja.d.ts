/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'brush-ninja-drawing': {
        children?: React.ReactNode;
        style?: React.CSSProperties;
        className?: string;
      };
    }
  }
} 