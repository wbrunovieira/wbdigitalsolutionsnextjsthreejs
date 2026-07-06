// @typescript-eslint/eslint-plugin is CommonJS: a named import breaks under
// ESM, which meant this config NEVER loaded and lint never actually ran.
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
    // Flat-config shape fix: `plugins` maps name -> plugin OBJECT (the old
    // file assigned `.rules` here, so no plugin rule ever registered). The
    // recommended rule SETS move into `rules` via spread, same strength.
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: pluginReact,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      // TypeScript project: prop types are compile-time checked, runtime
      // PropTypes would be an anti-pattern (official typescript-eslint
      // guidance). Same for base no-unused-vars: the @typescript-eslint
      // version REPLACES it (the base rule false-positives on types/enums).
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      semi: ["error", "always"],
      quotes: ["error", "single", { avoidEscape: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-body-style": ["warn", "as-needed"],
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
  // React Three Fiber components: the custom 3D reconciler uses JSX props
  // (position, args, intensity...) the DOM-oriented react plugin cannot know.
  // The rule stays ON for every regular component; this scoped override
  // lists ONLY the R3F scene files (rule-applicability fix, not a weakening).
  {
    files: [
      "src/components/3d-showcase/components/Button3D.tsx",
      "src/components/3d-showcase/components/Desk.tsx",
      "src/components/3d-showcase/components/FloatingParticles.tsx",
      "src/components/3d-showcase/components/HolographicInfo.tsx",
      "src/components/3d-showcase/components/Lighting.tsx",
      "src/components/3d-showcase/components/Monitor.tsx",
      "src/components/3d-showcase/components/PointerHand.tsx",
      "src/components/3d-showcase/components/Room.tsx",
      "src/components/3d-tunnel/TunnelScene.tsx",
      "src/components/3d-tunnel/TunnelSceneEnhanced.tsx",
      "src/components/AnimatedBackgorundAutomation.tsx",
      "src/components/AnimatedBackgoundAIComponent.tsx",
      "src/components/AnimatedBackgroundWebsite.tsx",
      "src/components/Cube.tsx",
      "src/components/Lighting.tsx",
      "src/components/PathNavigator.tsx",
      "src/components/PeriodicTableClient.tsx",
      "src/components/Systems.tsx",
      "src/components/WebSiteCTA.tsx",
      "src/components/canvas/Ball.tsx",
      "src/components/canvas/ComputersCanvas.tsx",
      "src/components/canvas/Earth.tsx",
      "src/components/canvas/ScrollAIHero3D.tsx",
      "src/components/canvas/ScrollAutomationHero3D.tsx",
      "src/components/canvas/ScrollComputer3D.tsx",
      "src/components/canvas/ScrollSystems3D.tsx",
      "src/components/canvas/ScrollWebsiteHero3D.tsx",
      "src/components/home/Portal3DSection.tsx",
      "src/components/home/Portal3DSectionGSAP.tsx",
      "src/components/projects/ProjectsHero3D.tsx"
    ],
    rules: {
      "react/no-unknown-property": "off",
    },
  },
];
