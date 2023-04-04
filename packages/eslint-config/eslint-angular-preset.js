module.exports = {
  extends: [
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
    "./eslint-ts-preset.js",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@angular-eslint/component-selector": [
      "error",
      {
        type: "element",
        prefix: ["pre", "app"],
        style: "kebab-case",
      },
    ],
    "@angular-eslint/directive-selector": [
      "error",
      {
        type: "attribute",
        prefix: ["pre", "app"],
        style: "camelCase",
      },
    ],
    "@angular-eslint/no-forward-ref": "off",
    "@angular-eslint/no-pipe-impure": "error",
    "@angular-eslint/no-queries-metadata-property": "error",
    "@angular-eslint/prefer-output-readonly": "error",
    "@angular-eslint/use-component-view-encapsulation": "error",
    "@typescript-eslint/member-ordering": [
      "off",
      {
        "default": {
          "memberTypes": [
            // Fields
            "static-field", // = ["public-static-field", "protected-static-field", "private-static-field"]
            "instance-field", // = ["public-instance-field", "protected-instance-field", "private-instance-field"]
            "abstract-field", // = ["public-abstract-field", "protected-abstract-field", "private-abstract-field"]

            // Constructors
            "constructor", // = ["public-constructor", "protected-constructor", "private-constructor"]

            // Getters
            "static-get", // = ["public-static-get", "protected-static-get", "private-static-get"]
            "instance-get", // = ["public-instance-get", "protected-instance-get", "private-instance-get"]
            "abstract-get", // = ["public-abstract-get", "protected-abstract-get", "private-abstract-get"]

            // Setters
            "static-set", // = ["public-static-set", "protected-static-set", "private-static-set"]
            "instance-set", // = ["public-instance-set", "protected-instance-set", "private-instance-set"]
            "abstract-set", // = ["public-abstract-set", "protected-abstract-set", "private-abstract-set"]

            // Methods
            "static-method", // = ["public-static-method", "protected-static-method", "private-static-method"]
            "instance-method", // = ["public-instance-method", "protected-instance-method", "private-instance-method"]
            "abstract-method" // = ["public-abstract-method", "protected-abstract-method", "private-abstract-method"]
          ]
        }
      }
    ],
    "spaced-comment": [
      "error", 
      "always", 
      { 
        "exceptions": ["-"],
        "markers": ["/"]
      }
    ],
  },
  overrides: [
    {
      files: ["*.html"],
      excludedFiles: ["*inline-template-*.component.html"],
      extends: ["plugin:prettier/recommended"],
      rules: {
        "prettier/prettier": ["error", { parser: "angular" }],
      },
    },
  ],
};
