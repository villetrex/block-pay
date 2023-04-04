module.exports = {
  env: {
    browser: true,
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-boolean-value": ["error", "never"],
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
