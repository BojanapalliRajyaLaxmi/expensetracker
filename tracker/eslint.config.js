// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ]
module.exports = {
  parser: "@babel/eslint-parser",  // or "babel-eslint" for older setups
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",  // Add this to avoid React import warnings
    "plugin:tailwindcss/recommended", // TailwindCSS plugin for linting
  ],
  plugins: [
    "react",
    "tailwindcss",  // Enable Tailwind CSS linting
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Since React 17, this is no longer needed
    "react/prop-types": "off", // Disable PropTypes check if not using it
    "tailwindcss/classnames-order": "warn",  // Warn about incorrect class order
  },
  settings: {
    react: {
      version: "detect",  // Automatically detect the React version
    },
  },
};
