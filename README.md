# languageAbsolutely! Here's a **refined and detailed PRD** without the optional/future features—ready to be used as a prompt or shared with a developer/designer.

---

## 🌐 Product Requirements Document (PRD)  
### Project Name: *Hangul Helper*  
### Version: 1.0 (MVP)  
### Prepared for: iPad-first experience with Apple Pencil support  
---

### 📌 Overview  
**Hangul Helper** is a language learning web app for Korean learners that uses a flashcard-based system to help users practice Korean by handwriting responses with an Apple Pencil. The app is designed for iPad use but should also work on desktop. It emphasizes active recall, writing practice, and spaced repetition through progress tracking and smart review of incorrect cards.

---

### 🎯 Objectives

1. Enable users to practice Korean by writing their answers by hand.
2. Allow users to visually compare their handwritten answers with the correct Korean translation.
3. Support organization of flashcards into Units for structured learning.
4. Track learning progress and accuracy per card and per unit.
5. Prioritize practice of difficult flashcards.
6. Provide a clean, focused, and responsive user interface optimized for iPad.

---

### 🧩 Features & Functional Requirements

---

#### 1. Flashcard Prompting

**Description:**  
Each flashcard displays an English word or sentence as a prompt for the user to respond to in Korean.

**Requirements:**
- Flashcard front shows:
  - English prompt (plain text)
  - Optional notes section (see Feature 4)
  - A drawing canvas for handwriting
- Flashcard back shows:
  - Correct Korean translation (text)
  - User’s handwriting from the canvas
- “Flip” button toggles between front and back views.

---

#### 2. Handwriting Input (Apple Pencil Friendly)

**Description:**  
User can write Korean directly on the card using their Apple Pencil.

**Requirements:**
- Canvas supports freehand drawing and pressure sensitivity (if available)
- Touch input fallback for non-pencil users
- Clear/reset button to erase handwriting
- Save the canvas drawing with the card instance for later review
- Match the canvas size across devices for visual consistency

---

#### 3. Flip Card Interaction

**Description:**  
User flips a card to see the answer and compare it to what they wrote.

**Requirements:**
- Flip animation or transition (card visually flips or switches view)
- Back of card shows:
  - Korean correct answer (typed text)
  - User’s own handwriting (same canvas data from front)
- Two buttons after viewing:
  - ✅ “Got it right”
  - ❌ “Got it wrong”
- User input on correctness updates the card's performance record

---

#### 4. Notes Field for Prompts

**Description:**  
Each card can contain an optional note that gives users context or reminders.

**Requirements:**
- Display under the English prompt on the card front
- Text only (short reminders like "Use past tense" or "Honorific form")
- Editable by the user in edit mode (admin panel or creator view)

---

#### 5. Units & Card Organization

**Description:**  
Cards are grouped into Units that represent lessons, topics, or vocabulary sets.

**Requirements:**
- Units listed in a sidebar or tab view
- Clicking a Unit opens that set of cards
- Ability to:
  - Add a new Unit
  - Add/remove cards to a Unit
  - Rename or delete a Unit

---

#### 6. Progress Tracking & Accuracy

**Description:**  
Track how well users are doing per card and per Unit.

**Requirements:**
- Each card stores:
  - Number of times reviewed
  - Number of times marked correct
  - Accuracy rate (auto-calculated)
- Unit-level summary:
  - Total cards
  - Cards reviewed
  - % mastered (e.g., accuracy ≥ 80%)

---

#### 7. Smart Review Mode (Missed Cards)

**Description:**  
A dedicated mode that lets users focus on flashcards they often get wrong.

**Requirements:**
- “Review Missed Cards” button:
  - Generates a session of cards with <80% accuracy
- Should pull cards across all units or by selected unit
- Tracks session performance separately

---

#### 8. Shuffle Mode

**Description:**  
Option to shuffle cards during a study session.

**Requirements:**
- Toggle switch or shuffle button
- Randomizes card order within a unit or session
- Should preserve user input and tracking as usual

---

### 🎨 UI/UX Requirements

- Responsive layout optimized for **iPad landscape and portrait**
- Full-screen canvas for writing without scrolling
- Smooth card flipping animation or transition
- High-contrast design for legibility
- Button design should be large and tap-friendly

---

### 🧠 Non-Functional Requirements

- **Performance:** Fast loading, low latency on flipping and saving handwriting
- **Data Storage:** Use Firebase, Supabase, or similar to store:
  - User data
  - Handwriting canvas content (as image or base64)
  - Card accuracy stats
- **Cross-Device Support:** iPad (primary), desktop/laptop (secondary)

---

### 📋 MVP Deliverables Checklist

- [ ] Flashcard UI with English prompt
- [ ] Drawing canvas with Apple Pencil support
- [ ] Flip card with answer + user’s drawing
- [ ] Mark card as correct/incorrect
- [ ] Notes field for prompts
- [ ] Units view with card organization
- [ ] Accuracy + progress tracking
- [ ] Review Missed Cards mode
- [ ] Shuffle mode

---

