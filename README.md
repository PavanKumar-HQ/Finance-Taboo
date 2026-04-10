# 💸 Finance Taboo: Market Mayhem (V2.1)

A premium, high-fidelity party game built with a **Neo-brutalist** aesthetic. Challenge your financial knowledge across multiple categories without saying the forbidden words!

![Neo-Brutalist UI](https://img.shields.io/badge/UI-Neo--Brutalist-yellow?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/Logic-Vanilla%20JS-blue?style=for-the-badge)
![Audio](https://img.shields.io/badge/Audio-Web%20Audio%20API-green?style=for-the-badge)

---

## 🚀 Features

-   **Polished Flow**: Instant transitions between rounds with zero dead time.
-   **Game Modes**:
    -   **Classic**: 60s rounds with unlimited skips.
    -   **Rapid Fire**: 30s rounds for high-pressure play.
    -   **Risk Mode**: High stakes (+2 points for correct, -1 for skip).
-   **Premium Audio**: Procedural sound engine (no external assets) providing melodic chimes, snaps, and ticks.
-   **Advanced Mechanics**:
    -   **Combo Streaks**: Bonus points for 3+ and 5+ correct answers.
    -   **Wild Cards**: Random mid-round challenges (e.g., "No hand gestures", "Explain like a pirate").
-   **Neo-Brutalist Design**: Bold typography, thick borders, hard shadows, and vibrant saturation.

## 📁 Project Structure

-   `index.html`: Semantic HTML5 structure with a multi-screen state machine.
-   `style.css`: Custom CSS design system with advanced animations (swipes, shakes, flashes).
-   `script.js`: Core game engine, procedural audio, and state management.

## 🛠 Setup & Development

The game is built with zero dependencies. To run it locally:

1. Clone the repository.
2. Open `index.html` in any modern browser.
3. (Optional) Run with a local server for the best experience:
   ```bash
   npx serve .
   ```

## 🎯 Gameplay Rules

1. **Objective**: Help your teammates guess the target financial term without using the word itself or any of its 5 taboo words.
2. **Teams**: Split into 2 teams (e.g., Bulls vs. Bears).
3. **Actions**:
   - ✅ **Correct**: Points awarded. Streaks grant bonuses.
   - ⏭ **Skip**: Move to the next word immediately (Unlimited).
   - ❌ **Pass**: Skip the word but lose 1 point.
   - ⏸ **Pause**: Stop the timer for a quick thinking break.

---

Created with ❤️ by **Antigravity**.
