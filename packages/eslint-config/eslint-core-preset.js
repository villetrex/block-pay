module.exports = {
  extends: ["plugin:prettier/recommended"],
  plugins: ["import", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        printWidth: 120,
        arrowParens: "avoid",
        singleQuote: true,
        endOfLine: "auto",
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "no-duplicate-imports": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc" },
        pathGroups: [
          {
            pattern: "src/**",
            group: "internal",
          },
        ],
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent", "index"],
          "object",
        ],
        pathGroupsExcludedImportTypes: ["builtin", "object"],
      },
    ],
    "no-debugger": "error",
    "import/no-anonymous-default-export": "off",
    "import/no-relative-parent-imports": "error",
    "import/newline-after-import": "error",
    "import/dynamic-import-chunkname": [
      "error",
      {
        importFunctions: ["dynamicImport"],
        webpackChunknameFormat: "[a-zA-Z0-57-9-/_]+",
      },
    ],
    camelcase: "off",
    curly: ["error", "all"],
    "no-console": "warn",
    "no-unused-vars": ["error", { vars: "all", args: "after-used" }],
    "prefer-object-spread": "error",
    "object-shorthand": ["error", "always"],
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "lines-between-class-members": ["error", "always"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "export" },
    ],
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import/external-module-folders": ["node_modules", "src"],
  },
};
