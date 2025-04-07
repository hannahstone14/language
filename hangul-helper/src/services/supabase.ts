import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Unit {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  total_cards: number;
  cards_reviewed: number;
  mastered_cards: number;
}

export interface Flashcard {
  id: string;
  unit_id: string;
  english_prompt: string;
  korean_answer: string;
  notes?: string;
  times_reviewed: number;
  times_correct: number;
  accuracy: number;
  last_reviewed?: string;
  created_at: string;
  updated_at: string;
} 