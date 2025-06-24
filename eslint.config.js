import js from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  reactHooks.configs['recommended-latest'],
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
]
