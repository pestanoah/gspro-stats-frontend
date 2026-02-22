//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  {
    rules: {
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-console': 'warn',
    },
  },
  ...tanstackConfig,
];
