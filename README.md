# Game Testing Framework

A reusable automated testing framework for slot games using Playwright. This framework provides a base test suite that can be extended for testing different slot games while maintaining consistent test coverage and reducing code duplication.

## Features

- Base test class with common game testing functionality
- Configurable selectors for different game implementations
- TypeScript support for better maintainability
- Modular test structure
- Built-in test fixtures for setup and teardown

## Prerequisites

- Node.js (v14 or higher)
- Playwright
- TypeScript

## Project Structure

```
├── tests/
│   ├── base-game.test.ts     # Base test class with common functionality
│   └── super-showball.test.ts # Example implementation for specific game
└── README.md
```

## Test Coverage

The framework includes tests for:

1. Game Launch Verification
   - Canvas visibility
   - Game container presence
   - Loading screen completion
   - Error-free startup
   - Balance display

2. Paytable Navigation
   - Opening/closing paytable
   - Page navigation
   - Content visibility

3. Sound Controls
   - Mute/unmute functionality
   - Button state verification

4. Help Files
   - Access to help section
   - Content verification
   - Navigation

5. Game Play
   - Spin button functionality
   - Balance updates
   - Animation states

## Usage

### Running Tests

```bash
npx playwright test
```

### Creating Tests for a New Game

1. Create a new test file extending `BaseGameTest`:

```typescript
import { test } from './base-game.test';

test.describe('Your Game Name Tests', () => {
  test.beforeEach(async ({ gameTest }) => {
    await gameTest.setup();
  });

  test('should launch game successfully', async ({ gameTest }) => {
    await gameTest.verifyGameLaunch();
  });

  // Add more tests...
});
```

2. Override selectors if needed:

```typescript
class YourGameTest extends BaseGameTest {
  protected selectors = {
    ...super.selectors,
    spinButton: '.your-spin-button-class',
    // Override other selectors as needed
  };
}
```

## Best Practices

1. Always extend the base test class for new games
2. Override selectors instead of modifying the base class
3. Add game-specific test methods in the game's test class
4. Use meaningful test descriptions
5. Keep tests independent and atomic
6. Use appropriate timeouts for animations and state changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT