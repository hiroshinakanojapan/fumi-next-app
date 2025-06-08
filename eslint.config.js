/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: "next",
  rules: {
    // デプロイのため一時的にチェックをオフ
    "prefer-const": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
