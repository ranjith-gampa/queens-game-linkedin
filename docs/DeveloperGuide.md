# Developer Guide for Queens Game

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/queens-game.git
cd queens-game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. The application will be available at `http://localhost:5173`

### Project Structure Overview

- `/src`: Main source code directory
  - `/components`: UI components organized by feature
  - `/hooks`: Custom React hooks
  - `/utils`: Utility functions and level data
  - `/i18n`: Internationalization files
  - `/pages`: Page components for routing
  - `/assets`: Static assets like images

## Adding New Levels

### Standard Levels

1. Create a new level file in `src/utils/levels/`:

```typescript
// src/utils/levels/level{N}.ts
export const level{N} = {
  size: 8, // Board dimensions (8x8)
  colorRegions: [
    // Array of [row, column] coordinates defining regions
    [0, 0], [0, 1], [0, 2], [0, 3],
    // ... more coordinates
  ],
  regionColors: [
    // 2D array of colors for each coordinate
    ["#FFC107", "#FFA000", "#FFD54F", "#FFE082"],
    // ... more colors
  ],
  hints: true, // Whether to show hints for this level
};
```

2. Add the level to the levels collection in `src/utils/levels.ts`:

```typescript
import { level{N} } from "./levels/level{N}";

export const levels = {
  // ... existing levels
  level{N},
};
```

### Bonus Levels

1. Create a new bonus level file in `src/utils/bonus-levels/`:

```typescript
// src/utils/bonus-levels/YYYY-MM-DD.ts
export const bonusLevelYYYYMMDD = {
  id: "YYYY-MM-DD",
  size: 8,
  title: "Special Challenge",
  colorRegions: [
    // Array of [row, column] coordinates defining regions
  ],
  regionColors: [
    // 2D array of colors for each coordinate
  ],
  releaseDate: "YYYY-MM-DD",
};
```

2. Add the level to the bonus levels collection in `src/utils/bonusLevels.ts`:

```typescript
import { bonusLevelYYYYMMDD } from "./bonus-levels/YYYY-MM-DD";

export const bonusLevels = [
  // ... existing bonus levels
  bonusLevelYYYYMMDD,
];
```

### Community Levels

1. Create a new community level file in `src/utils/community-levels/`:

```typescript
// src/utils/community-levels/level{N}.ts
export const communityLevel{N} = {
  id: "{N}",
  size: 6,
  title: "Community Puzzle",
  colorRegions: [
    // Array of [row, column] coordinates defining regions
  ],
  regionColors: [
    // 2D array of colors for each coordinate
  ],
  createdBy: "Creator Name",
  personalLink: "https://github.com/username",
  note: "Optional description of the level",
};
```

2. Add the level to the community levels collection in `src/utils/communityLevels.ts`:

```typescript
import { communityLevel{N} } from "./community-levels/level{N}";

export const communityLevels = [
  // ... existing community levels
  communityLevel{N},
];
```

3. You can also use the Level Builder tool to generate levels and export the code.

## Creating Custom Game Mechanics

### Extending the Game Logic

The core game logic is in `src/hooks/useGameLogic.ts`. To extend or modify the game mechanics:

1. Identify what aspect of the game logic you need to modify:
   - Board state management
   - Queen placement rules
   - Win conditions
   - Conflict detection

2. Modify the `useGameLogic` hook:

```typescript
// src/hooks/useGameLogic.ts
const useGameLogic = ({ id, boardSize, colorRegions, levelType = "standard" }) => {
  // Add or modify state variables
  const [customMechanic, setCustomMechanic] = useState(false);

  // Add custom functions
  const handleCustomMechanic = () => {
    // Implementation
  };

  // Modify existing functions to incorporate new behavior
  const enhancedHandleSquareClick = (row, col) => {
    // Custom logic before standard behavior
    if (customMechanic) {
      // Special handling
    }
    
    // Standard click handling
    handleSquareClick(row, col);
  };

  // Return new states and functions along with existing ones
  return {
    // ... existing return values
    customMechanic,
    handleCustomMechanic,
  };
};
```

3. Implement utility functions in `src/utils/gameLogic.ts` if needed.

### Creating New Board Behavior

To add new board interactions or behaviors:

1. Add new functions to `src/utils/board.ts` for board-specific logic:

```typescript
// src/utils/board.ts
export const customBoardFunction = (board) => {
  // Implement custom board manipulation
  return modifiedBoard;
};
```

2. Create a custom hook if the feature is complex enough to warrant one:

```typescript
// src/hooks/useCustomFeature.ts
import { useState, useEffect } from "react";

export const useCustomFeature = (board) => {
  // State and logic for the custom feature

  return {
    // Return values and functions for the feature
  };
};
```

## Implementing New Features

### Adding a New Component

1. Create a new component directory in the appropriate location:

```typescript
// src/components/NewFeature/NewFeature.tsx
import React from "react";

interface NewFeatureProps {
  // Define props
}

const NewFeature: React.FC<NewFeatureProps> = (props) => {
  // Component implementation

  return (
    <div className="new-feature">
      {/* Component JSX */}
    </div>
  );
};

export default NewFeature;
```

2. Create sub-components as needed in a components directory:

```
src/components/NewFeature/
├── NewFeature.tsx
├── components/
│   ├── SubComponentA.tsx
│   └── SubComponentB.tsx
```

3. Add the component to the appropriate page or parent component:

```typescript
// src/pages/PageWithNewFeature.tsx
import NewFeature from "@/components/NewFeature/NewFeature";

const PageWithNewFeature = () => {
  return (
    <div>
      <h1>Page Title</h1>
      <NewFeature />
    </div>
  );
};
```

### Adding a New Page

1. Create a new page component in the `src/pages` directory:

```typescript
// src/pages/NewPage.tsx
import { useTranslation } from "react-i18next";
import NewFeature from "@/components/NewFeature/NewFeature";
import PageTitle from "@/components/PageTitle";

const NewPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle>{t("NEW_PAGE.TITLE")}</PageTitle>
      <NewFeature />
    </div>
  );
};

export default NewPage;
```

2. Add the route in `src/App.jsx`:

```jsx
// src/App.jsx
import NewPage from "./pages/NewPage";

// In the router definition:
{
  path: "/new-page",
  element: <NewPage />
}
```

## Internationalization

### Adding New Translations

1. For each supported language, add new translation keys in the corresponding language file:

```json
// src/i18n/en.json
{
  "NEW_SECTION": {
    "TITLE": "New Feature",
    "DESCRIPTION": "This is a new feature in the application"
  }
}
```

```json
// src/i18n/es.json
{
  "NEW_SECTION": {
    "TITLE": "Nueva Característica",
    "DESCRIPTION": "Esta es una nueva característica en la aplicación"
  }
}
```

2. Add entries for all supported languages in:
   - `src/i18n/en.json` (English - source of truth)
   - `src/i18n/fr.json` (French)
   - `src/i18n/es.json` (Spanish)
   - `src/i18n/ar.json` (Arabic)
   - `src/i18n/it.json` (Italian)
   - `src/i18n/pt.json` (Portuguese)
   - `src/i18n/zh.json` (Chinese)

### Adding a New Language

1. Create a new language file in `src/i18n/`:

```json
// src/i18n/de.json
{
  "APP_NAME": "Queens Game",
  // Add all translation keys here
}
```

2. Update the language configuration in `src/i18n/index.js`:

```javascript
// src/i18n/index.js
import de from './de.json';

// Add to resources:
const resources = {
  // Existing languages
  de: {
    translation: de,
  },
}
```

3. Add the language to the dropdown in `src/components/LevelSelection/components/LanguageDropdown.tsx`.

### Using Translations in Code

To use translations in components:

```typescript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('NEW_SECTION.TITLE')}</h1>
      <p>{t('NEW_SECTION.DESCRIPTION')}</p>
    </div>
  );
};
```

## Mobile Development

### Setting Up Expo for Mobile Development

1. Install Expo CLI globally:
```bash
npm install -g expo-cli
# or
yarn global add expo-cli
```

2. Start the Expo development server:
```bash
npx expo start
```

3. Follow the instructions to open the app in a simulator/emulator or on your device with the Expo Go app.

### Mobile-Specific Components

Mobile-specific components are located in `src/components/mobile/`:

- `Board.tsx`: Mobile-optimized game board
- `Level.tsx`: Mobile-friendly level container
- `Square.tsx`: Touch-optimized squares

To add or modify mobile components:

1. Create or modify files in the `mobile` directory:

```typescript
// src/components/mobile/NewMobileComponent.tsx
import { TouchableOpacity, Text, View } from "react-native";

const NewMobileComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewMobileComponent;
```

2. Apply mobile styles from `src/styles/mobile.ts`:

```typescript
// src/styles/mobile.ts
export const newMobileComponentStyles = {
  container: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
};
```

### Building and Deploying Mobile Apps

For detailed instructions on building and deploying the Expo application, refer to the `EXPO_DEPLOYMENT.md` file in the project root.

## Testing

### Unit Testing

1. Create test files alongside components with the `.test.jsx` or `.test.tsx` extension:

```typescript
// src/components/NewFeature/NewFeature.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewFeature from "./NewFeature";

describe("NewFeature", () => {
  it("renders correctly", () => {
    render(<NewFeature />);
    expect(screen.getByText(/feature title/i)).toBeInTheDocument();
  });

  it("handles user interaction", async () => {
    render(<NewFeature />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/clicked/i)).toBeInTheDocument();
  });
});
```

2. Run tests using:
```bash
npm test
# or
yarn test
```

### Testing Game Logic

For testing game logic, create tests specifically for your utilities and hooks:

```typescript
// src/utils/board.test.ts
import { createEmptyBoard, canQueensAttack } from "./board";

describe("Board Utilities", () => {
  it("creates empty board with correct dimensions", () => {
    const board = createEmptyBoard(4);
    expect(board.length).toBe(4);
    expect(board[0].length).toBe(4);
  });

  it("correctly detects queen attacks", () => {
    expect(canQueensAttack(0, 0, 0, 3)).toBe(true); // Same row
    expect(canQueensAttack(0, 0, 3, 0)).toBe(true); // Same column
    expect(canQueensAttack(0, 0, 3, 3)).toBe(true); // Diagonal
    expect(canQueensAttack(0, 0, 2, 3)).toBe(false); // No attack
  });
});
```

### Manual Testing Checklist

When adding new features, manually test:

1. Game mechanics with different board sizes and configurations
2. UI responsiveness on different screen sizes
3. Internationalization for all supported languages
4. Dark/light theme appearance
5. Mobile touch interactions
6. Accessibility features (keyboard navigation, screen readers)

## Contributing

### Workflow

1. Fork the repository on GitHub
2. Clone your fork to your local machine
3. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and commit them:
```bash
git commit -m "Add feature: description of your feature"
```

5. Push your changes to your fork:
```bash
git push origin feature/your-feature-name
```

6. Create a pull request from your fork to the main repository

### Pull Request Guidelines

When submitting a pull request:

1. Clearly describe the purpose of the PR
2. Reference any related issues
3. Include screenshots or animations for UI changes
4. Ensure all tests pass
5. Include relevant documentation updates

### Documentation

When adding new features or making significant changes:

1. Update or create relevant documentation in the `docs/` directory
2. Add inline code comments for complex logic
3. Update component props documentation with JSDoc comments

## Code Standards

### TypeScript Guidelines

1. Use TypeScript for all new files
2. Define interfaces for component props
3. Avoid using `any` type where possible
4. Use type narrowing instead of type assertions when applicable

### React Best Practices

1. Use functional components with hooks
2. Extract reusable logic into custom hooks
3. Keep components focused on a single responsibility
4. Maintain proper prop validation
5. Use React.memo for performance optimization when appropriate

### CSS/Styling Guidelines

1. Use Tailwind CSS utility classes for styling
2. Create reusable component patterns for consistent UI
3. Follow responsive design principles 
4. Maintain dark/light theme compatibility
5. Use CSS variables for theme-specific values

### Code Formatting

The project uses Prettier for code formatting. To format your code:

```bash
npm run format
# or
yarn format
```

Ensure your code follows the project's eslint configuration:

```bash
npm run lint
# or
yarn lint
```

### Documentation Standards

1. Use JSDoc comments for functions and components:

```typescript
/**
 * Component that displays a custom game feature
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the feature
 * @param {Function} props.onAction - Callback function when action is performed
 * @returns {JSX.Element} The rendered component
 */
const NewFeature = ({ title, onAction }) => {
  // Implementation
};
```

2. Include examples in documentation when helpful
3. Document edge cases and limitations
4. Keep README and documentation files up to date
