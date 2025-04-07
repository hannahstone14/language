import { Box } from '@mui/material';
import { useEffect } from 'react';

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
  useEffect(() => {
    // Add the Brush Ninja script
    const script = document.createElement('script');
    script.src = 'https://embed.brush.ninja/drawing.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

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