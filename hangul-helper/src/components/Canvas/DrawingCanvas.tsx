import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

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
}: DrawingCanvasProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

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
      <brush-ninja-drawing></brush-ninja-drawing>
    </Box>
  );
};