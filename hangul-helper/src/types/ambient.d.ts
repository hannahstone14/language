/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    'brush-ninja-drawing': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare module 'brush-ninja-drawing' {
  const BrushNinjaDrawing: React.FC;
  export default BrushNinjaDrawing;
} 