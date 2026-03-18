# Bloom – Teen Wellness Companion

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- A calm, safe journaling + AI chat app for teens
- Mood check-in: teen selects how they're feeling (5 moods: happy, okay, sad, anxious, overwhelmed)
- Journal/chat interface: teen writes what they're feeling in a text area
- AI-style empathetic response: backend generates a gentle, supportive, non-judgmental response using keyword/mood-based logic and canned compassionate messages
- Journal entry history: past entries stored and viewable
- Resources section: a simple list of breathing exercises, grounding tips, and crisis lines
- Minimal onboarding: no mandatory login; optional nickname for personalization
- Calm, pastel UI matching the design preview ("Bloom" brand)

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend (Motoko):
   - Store journal entries: { id, nickname, mood, text, timestamp }
   - Generate empathetic response based on mood + keywords in text
   - Return response text alongside storing the entry
   - Query: get recent entries (by optional nickname)
2. Frontend:
   - Landing/home page with hero section ("Bloom") and feature highlights
   - Mood check-in step (emoji/icon selector)
   - Journal/chat panel: text input, submit, display AI response in a chat bubble
   - Entry history sidebar or panel
   - Resources tab with breathing exercises and grounding tips
   - Nickname prompt (optional, stored in localStorage)
   - Fully responsive, calm pastel design
