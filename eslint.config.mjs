import tsPlugin from "@typescript-eslint/eslint-plugin";
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
      "@typescript-eslint": tsPlugin,
      react: pluginReact,
    },
    rules: {
      semi: "off",  // Desabilitando regra de semicolon
      quotes: "off",  // Desabilitando regra de quotes
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "comma-dangle": "off",  // Desabilitando a regra de trailing comma
      "arrow-body-style": "off",  // Desabilitando para permitir blocks em arrow functions
      "no-unused-vars": "off",  // Desabilitando para TypeScript
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": [
        "error",
        { ignore: [
          "css",
          // Propriedades do Three.js / React Three Fiber
          "attach",
          "args",
          "position",
          "rotation",
          "scale",
          "geometry",
          "material",
          "emissive",
          "emissiveIntensity",
          "metalness",
          "roughness",
          "transparent",
          "opacity",
          "side",
          "color",
          "intensity",
          "castShadow",
          "receiveShadow",
          "frustumCulled",
          "renderOrder",
          "depthWrite",
          "depthTest",
          "stencilWrite",
          "stencilFunc",
          "stencilRef",
          "stencilMask",
          "wireframe"
        ] },
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
