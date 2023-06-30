module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/recommended',
    'airbnb'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    // 是否加分號
    semi: [2, 'never'],
    // 是否加分號 'never'可以單獨設定{"functions": "never"}
    'comma-dangle': ['error', 'never'],
    // React
    // 'React' must be in scope when using JSX
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // error: should be listed in the project's dependencies, not devDependencies.
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // JSX not allowed in files with extension
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // Missing file extension "tsx" for "./App"
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'no-unused-vars': 'warn',
    'no-console': 'off'
    // 'import/no-unresolved': 'off'
  },
  // Unable to resolve path to module './App'
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      caseSensitive: false
    }
  }
}
