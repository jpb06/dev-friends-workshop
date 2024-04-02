/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  // Base config
  extends: ['eslint:recommended', 'next'],
  overrides: [
    // React
    {
      files: ['**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      plugins: ['react', '@typescript-eslint', 'import', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'import/order': [
          'error',
          {
            alphabetize: { caseInsensitive: true, order: 'asc' },
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
            'newlines-between': 'always',
            pathGroups: [
              {
                pattern:
                  '{@api/**,@msw,@templates,@organisms,@molecules,@providers,@logic/**,@tests/**,@theme}',
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
        'react/jsx-no-leaked-render': [
          'warn',
          { validStrategies: ['ternary'] },
        ],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        eqeqeq: 'error',
        complexity: [
          'error',
          {
            max: 15,
          },
        ],
        curly: 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-unneeded-ternary': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'no-useless-return': 'error',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'info'],
          },
        ],
        'array-callback-return': [
          'error',
          {
            allowImplicit: true,
          },
        ],
      },
    },
    // Typescript
    {
      files: ['**/*.ts'],
      plugins: ['@stylistic/js', 'prettier', '@typescript-eslint', 'import'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex':
          '^@(api/|@msw|@templates|@organisms|@molecules|@providers|@logic/|@tests/|@theme)',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'import/order': [
          'error',
          {
            alphabetize: { caseInsensitive: true, order: 'asc' },
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
            'newlines-between': 'always',
            pathGroups: [
              {
                pattern:
                  '{@api/**,@msw,@templates,@organisms,@molecules,@providers,@logic/**,@tests/**,@theme}',
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        '@stylistic/js/semi': 'error',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        eqeqeq: 'error',
        complexity: [
          'error',
          {
            max: 15,
          },
        ],
        curly: 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-unneeded-ternary': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'no-useless-return': 'error',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'info'],
          },
        ],
        'array-callback-return': [
          'error',
          {
            allowImplicit: true,
          },
        ],
      },
    },

    // Markdown
    {
      files: ['**/*.md'],
      plugins: ['markdown'],
      extends: ['plugin:markdown/recommended-legacy', 'prettier'],
    },

    // Vitest
    {
      files: ['**/*.test.{js,jsx,ts,tsx}'],
      plugins: ['testing-library'],
      extends: ['plugin:testing-library/react', 'prettier'],
      settings: {},
    },

    // Node
    {
      files: ['.eslintrc.js', 'postcss.config.js', 'next.config.js'],
      env: {
        node: true,
      },
    },
  ],
};
