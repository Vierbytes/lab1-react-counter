# Lab 1: Advanced Counter with React Hooks

This project demonstrates proficiency with React's `useState` and `useEffect` hooks by building an advanced counter application with multiple features.

## Project Overview

The Advanced Counter application is built with React, TypeScript, and Vite. It showcases proper hook usage, side effect management, and cleanup functions.

## Features Implemented

### Core Functionality
- **Display Current Count** - Shows the counter value (starts at 0)
- **Increment Button** - Increases count by step value
- **Decrement Button** - Decreases count by step value

### Advanced Features (All 5 Implemented)

1. **History Tracking** ✓
   - Tracks all count values as they change
   - Displays complete history to the user
   - Shows total number of changes made

2. **Auto-Save to localStorage** ✓
   - Automatically saves count value to localStorage
   - Persists across browser sessions
   - Loads saved value on app startup

3. **Keyboard Event Listeners** ✓
   - ArrowUp key increments the counter
   - ArrowDown key decrements the counter
   - Proper cleanup on component unmount

4. **Reset Mechanism** ✓
   - Button to reset count to 0
   - Clears history on reset

5. **Custom Step Input** ✓
   - Input field to set custom increment/decrement amount
   - Applies to both button clicks and keyboard controls

## Technical Implementation

### Component Structure
- **AdvancedCounter.tsx** - Main component with all functionality
- **AdvancedCounter.css** - Styling with responsive design
- **App.tsx** - Root application component

### React Hooks Used

#### useState
- Manages count value with lazy initialization from localStorage
- Tracks history array
- Controls step value for custom increments

#### useEffect
- **Auto-save effect** - Saves count to localStorage whenever it changes
- **Keyboard listener effect** - Adds/removes event listeners with proper cleanup

### Key Learning Points
- Lazy initialization with useState to avoid setState in effects
- Proper dependency arrays in useEffect hooks
- Event listener cleanup to prevent memory leaks
- Avoiding cascading renders by managing state updates correctly

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## Project Requirements Met

- ✓ Component named `AdvancedCounter.tsx`
- ✓ Uses `useState` for count, history, and step
- ✓ Uses `useEffect` for side effects (auto-save, event listeners)
- ✓ Proper dependency arrays in all useEffect hooks
- ✓ Cleanup functions for event listeners
- ✓ No React console errors
- ✓ All 5 features implemented (exceeded the 3 minimum requirement)

## Code Quality

- TypeScript for type safety
- ESLint configured with React-specific rules
- Clean code with comprehensive comments
- Responsive CSS design
- No linting errors
- Successful production build
