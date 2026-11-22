# PulseFeed • Live Activity Feed Demo

A clean, responsive Live Activity Feed web application built with vanilla JavaScript and Vite. It demonstrates live relative time updates using the local `time-ago-lite` npm package.

## Preview

```text
+--------------------------------------------------------------------------+
|  ⚡ PulseFeed  [Auto-refreshing (10s)]                              [🌙] |
|--------------------------------------------------------------------------|
|  [Create a Post]                                   [ 🗓️ Date Tester ]    |
|  Name: [ Sarah Connor            ]                 Pick date: [ 📅     ] |
|  Text: [ Shipping new feature 🚀 ]                 Result: "in 3 days"   |
|  [Post Update]                                     Presets: [+5m] [+3d]  |
|                                                                          |
|  Live Feed (9 items)                                                     |
|  - (ER) Elena Rostova    • "just now"                                    |
|  - (MV) Marcus Vance     • "45 seconds ago"                              |
|  - (SC) Sophia Chen      • "5 minutes ago"                               |
|  - (LG) Liam Gallagher   • "2 days ago"                                  |
|  - (KS) Kenji Sato       • "4 months ago"                                |
+--------------------------------------------------------------------------+
```

## Features

- **Live Activity Feed:** Sample posts with realistic timestamps spanning seconds, minutes, hours, days, weeks, months, and years.
- **Auto-Refresh:** Timestamps recalculate in-place every 10 seconds without page reload.
- **Add Post:** Compose new posts that appear immediately as "just now" and age in real-time.
- **Interactive Date Tester:** Test past dates, future dates (e.g. "in 3 days"), numerical timestamps, ISO strings, and quick presets.
- **Graceful Error Handling:** Catches invalid dates and renders descriptive `TypeError` messages in the UI.
- **Dark & Light Mode:** Toggleable theme with local storage persistence.

## Package Note

This demo project consumes the local **`time-ago-lite`** package:
```json
"dependencies": {
  "time-ago-lite": "file:/Users/aryansangwan/.gemini/antigravity/scratch/time-ago-lite"
}
```

## How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```
