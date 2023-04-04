module.exports = {
  env: {
    browser: true,
  },
  extends: ["plugin:@next/next/recommended"],
  ignorePatterns: ["out/**", ".next/**"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
};
