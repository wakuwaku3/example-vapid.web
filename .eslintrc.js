module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint", "react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": ["error", { singleQuote: true }],
    quotes: [2, "single", "avoid-escape"],
    semi: [2, "always"],
    "no-useless-escape": 0,
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": 0,
  },
};
