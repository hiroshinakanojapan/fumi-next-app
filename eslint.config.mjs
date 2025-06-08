import js from "@eslint/js";
import next from "eslint-config-next";

export default [
  js.configs.recommended,
  ...next(),
  {
    rules: {
      "prefer-const": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
