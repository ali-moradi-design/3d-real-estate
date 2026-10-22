import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Entities and features are few and small in a landing page.
    files: ['./src/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
]);
