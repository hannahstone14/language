import { Box } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  onDrawingChange?: (dataUrl: string) => void;
  readOnly?: boolean;
  existingDrawing?: string;
}

export const DrawingCanvas = ({
  width = 500,
  height = 300,
  onDrawingChange,
  readOnly = false,
  existingDrawing,
}: DrawingCanvasProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const drawingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://embed.brush.ninja/drawing.js"]');
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    // Add the Brush Ninja script
    const script = document.createElement('script');
    script.src = 'https://embed.brush.ninja/drawing.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const scriptToRemove = document.querySelector('script[src="https://embed.brush.ninja/drawing.js"]');
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && drawingRef.current) {
      // Set up event listeners for drawing changes
      const handleDrawingChange = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'brush-ninja-drawing') {
          // Get the drawing data and pass it to the parent
          const drawingData = (target as any).getImage();
          onDrawingChange?.(drawingData);
        }
      };

      drawingRef.current.addEventListener('change', handleDrawingChange);
      
      // Load existing drawing if provided
      if (existingDrawing && (drawingRef.current as any).loadImage) {
        (drawingRef.current as any).loadImage(existingDrawing);
      }

      return () => {
        drawingRef.current?.removeEventListener('change', handleDrawingChange);
      };
    }
  }, [scriptLoaded, onDrawingChange, existingDrawing]);

  if (!scriptLoaded) {
    return (
      <Box
        sx={{
          width,
          height,
          border: '1px solid #ccc',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Loading drawing canvas...
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width,
        height,
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <brush-ninja-drawing
        ref={drawingRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        data-readonly={readOnly}
      ></brush-ninja-drawing>
    </Box>
  );
};