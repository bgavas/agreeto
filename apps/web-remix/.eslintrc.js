module.exports = {
  overrides: [
    {
      files: ["./**/*.ts", "./**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: require.resolve("./tsconfig.json"),
      },
      plugins: ["@typescript-eslint", "import", "simple-import-sort"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "import/no-duplicates": "warn",
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
      },
    },
  ],
};
