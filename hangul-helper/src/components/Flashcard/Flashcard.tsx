import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Flashcard as FlashcardType } from '../../services/supabase';
import { DrawingCanvas } from '../Canvas/DrawingCanvas';

interface FlashcardProps {
  flashcard: FlashcardType;
  onMarkCorrect: (id: string) => void;
  onMarkIncorrect: (id: string) => void;
}

export const Flashcard = ({ flashcard, onMarkCorrect, onMarkIncorrect }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [drawing, setDrawing] = useState<string>('');

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        maxWidth: 800,
        aspectRatio: '3/2',
        margin: '0 auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Front of card */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 3,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              {flashcard.english_prompt}
            </Typography>
            {flashcard.notes && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Note: {flashcard.notes}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ width: '100%', maxWidth: 600, my: 2 }}>
            <DrawingCanvas
              width={600}
              height={200}
              onDrawingChange={setDrawing}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleFlip}
            sx={{ mt: 2 }}
          >
            Show Answer
          </Button>
        </Box>

        {/* Back of card */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {flashcard.korean_answer}
          </Typography>

          {drawing && (
            <Box sx={{ width: '100%', maxWidth: 600, my: 2 }}>
              <DrawingCanvas
                width={600}
                height={200}
                readOnly
                existingDrawing={drawing}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  onMarkCorrect(flashcard.id);
                  setIsFlipped(false);
                  setDrawing('');
                }}
              >
                Got it Right ✅
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  onMarkIncorrect(flashcard.id);
                  setIsFlipped(false);
                  setDrawing('');
                }}
              >
                Got it Wrong ❌
              </Button>
            </Box>
            <Button
              variant="text"
              onClick={handleFlip}
            >
              Show Question
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}; 