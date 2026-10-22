import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  { ignores: ['out/**', '.next/**', 'next-env.d.ts', 'playwright-report/**', 'test-results/**'] },
];

export default eslintConfig;
