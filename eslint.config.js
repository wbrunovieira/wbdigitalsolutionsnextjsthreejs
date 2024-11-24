import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    ignores: ["node_modules/**", ".next/**", "dist/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsConfigs.recommended.rules,
      react: pluginReact.configs.recommended.rules,
      prettier: {
        rules: {
          "prettier/prettier": "error",
        },
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single", { avoidEscape: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-body-style": ["warn", "as-needed"],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": [
        "error",
        { ignore: ["css"] },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
];
