module.exports = {
  root: true,
  env: {
    browser: false,
    node: true,
    mocha: true,
    // es021: true
  },
  extends: [
    "@villetrex/eslint-config/eslint-core-preset",
    "@villetrex/eslint-config/eslint-ts-preset",
  ],
};

// module.exports = {
//   env: {
//     es2021: true,
//     node: true,
//     mocha: true
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "prettier"
//   ],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 12,
//     sourceType: "module"
//   },
//   plugins: ["simple-import-sort", "@typescript-eslint", "prettier"],
//   rules: {
//     "simple-import-sort/imports": "error",
//     "@typescript-eslint/ban-ts-comment": "off",
//     "prettier/prettier": "error"
//   }
// };
