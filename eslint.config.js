import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";


export default {
  root: true,
  ignorePatterns: ["node_modules/**", ".next/**", "dist/**"],
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      env: {
        browser: true,
        node: true,
        es2021: true,
      },
      globals: {
        ...globals.browser,
        React: "readonly", 
      },
      plugins: [
        "@typescript-eslint",
        "react",
        "prettier",
      ],
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
      rules: {
     
        ...tseslint.configs.recommended.rules,
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-floating-promises": "error",

  
        ...pluginReact.configs.recommended.rules,
        "react/react-in-jsx-scope": "off", 
        "react/no-unknown-property": [
          "error",
          {
            ignore: ["css"], 
          },
        ],

       
        "semi": ["error", "always"],
        "quotes": ["error", "single", { avoidEscape: true }],
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "no-unused-vars": "off",
        "comma-dangle": ["error", "always-multiline"],
        "arrow-body-style": ["warn", "as-needed"],

      
        "prettier/prettier": "error",
      },
    },
    {
 
      files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
      extends: ["next"],
      rules: {
        "@next/next/no-html-link-for-pages": "off", 
      },
    },
  ],
};
