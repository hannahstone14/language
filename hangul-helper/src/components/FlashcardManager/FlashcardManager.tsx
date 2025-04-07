import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  List as ListIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { supabase, Flashcard as FlashcardType } from '../../services/supabase';
import { Flashcard } from '../Flashcard/Flashcard';

interface FlashcardManagerProps {
  unitId: string;
  unitName: string;
}

interface FlashcardFormData {
  english_prompt: string;
  korean_answer: string;
  notes?: string;
}

type ViewMode = 'list' | 'study';

export const FlashcardManager: React.FC<FlashcardManagerProps> = ({ unitId, unitName }) => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FlashcardFormData>({
    english_prompt: '',
    korean_answer: '',
    notes: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    fetchFlashcards();
  }, [unitId]);

  const fetchFlashcards = async () => {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('unit_id', unitId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching flashcards:', error);
      return;
    }

    setFlashcards(data || []);
  };

  const handleOpenDialog = (flashcard?: FlashcardType) => {
    if (flashcard) {
      setFormData({
        english_prompt: flashcard.english_prompt,
        korean_answer: flashcard.korean_answer,
        notes: flashcard.notes || '',
      });
      setEditingId(flashcard.id);
    } else {
      setFormData({
        english_prompt: '',
        korean_answer: '',
        notes: '',
      });
      setEditingId(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({
      english_prompt: '',
      korean_answer: '',
      notes: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!formData.english_prompt || !formData.korean_answer) {
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('flashcards')
        .update({
          english_prompt: formData.english_prompt,
          korean_answer: formData.korean_answer,
          notes: formData.notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingId);

      if (error) {
        console.error('Error updating flashcard:', error);
        return;
      }
    } else {
      const { error } = await supabase.from('flashcards').insert([
        {
          unit_id: unitId,
          english_prompt: formData.english_prompt,
          korean_answer: formData.korean_answer,
          notes: formData.notes,
          times_reviewed: 0,
          times_correct: 0,
          accuracy: 0,
        },
      ]);

      if (error) {
        console.error('Error creating flashcard:', error);
        return;
      }
    }

    handleCloseDialog();
    fetchFlashcards();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('flashcards').delete().eq('id', id);

    if (error) {
      console.error('Error deleting flashcard:', error);
      return;
    }

    fetchFlashcards();
  };

  const handleMarkCorrect = async (id: string) => {
    const flashcard = flashcards.find(f => f.id === id);
    if (!flashcard) return;

    const newTimesReviewed = flashcard.times_reviewed + 1;
    const newTimesCorrect = flashcard.times_correct + 1;
    const newAccuracy = (newTimesCorrect / newTimesReviewed) * 100;

    const { error } = await supabase
      .from('flashcards')
      .update({
        times_reviewed: newTimesReviewed,
        times_correct: newTimesCorrect,
        accuracy: newAccuracy,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating flashcard stats:', error);
      return;
    }

    // Move to next card
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    fetchFlashcards();
  };

  const handleMarkIncorrect = async (id: string) => {
    const flashcard = flashcards.find(f => f.id === id);
    if (!flashcard) return;

    const newTimesReviewed = flashcard.times_reviewed + 1;
    const newAccuracy = (flashcard.times_correct / newTimesReviewed) * 100;

    const { error } = await supabase
      .from('flashcards')
      .update({
        times_reviewed: newTimesReviewed,
        accuracy: newAccuracy,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating flashcard stats:', error);
      return;
    }

    // Move to next card
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    fetchFlashcards();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{unitName} Flashcards</Typography>
        <Box display="flex" gap={2}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_: React.MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
              if (newMode !== null) {
                setViewMode(newMode);
                setCurrentCardIndex(0);
              }
            }}
          >
            <ToggleButton value="list">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="study">
              <SchoolIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Flashcard
          </Button>
        </Box>
      </Box>

      {viewMode === 'list' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>English</TableCell>
                <TableCell>Korean</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Accuracy</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flashcards.map((flashcard) => (
                <TableRow key={flashcard.id}>
                  <TableCell>{flashcard.english_prompt}</TableCell>
                  <TableCell>{flashcard.korean_answer}</TableCell>
                  <TableCell>{flashcard.notes}</TableCell>
                  <TableCell>{`${Math.round(flashcard.accuracy)}%`}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(flashcard)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(flashcard.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        flashcards.length > 0 && (
          <Flashcard
            flashcard={flashcards[currentCardIndex]}
            onMarkCorrect={handleMarkCorrect}
            onMarkIncorrect={handleMarkIncorrect}
          />
        )
      )}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Flashcard' : 'Add Flashcard'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="English Prompt"
              value={formData.english_prompt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, english_prompt: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Korean Answer"
              value={formData.korean_answer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, korean_answer: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Notes (Optional)"
              value={formData.notes}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, notes: e.target.value })
              }
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingId ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 