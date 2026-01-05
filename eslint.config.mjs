import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "studio/**"],
  },
  ...compat.extends("next/core-web-vitals", "prettier"),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      quotes: ["warn", "double"],
      "object-curly-spacing": ["error", "always"],
      "react/jsx-max-props-per-line": [1, { when: "always" }],
      "react/jsx-first-prop-new-line": [2, "multiline"],
      "react/jsx-indent-props": [2, 2],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "unknown",
            "internal",
            ["sibling", "parent"],
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/public/**",
              group: "unknown",
              position: "before",
            },
            {
              pattern: "@/app/**",
              group: "internal",
            },
            {
              pattern: "@/components/**",
              group: "internal",
            },
            {
              pattern: "@/lib/**",
              group: "internal",
            },
            {
              pattern: "@/config/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
