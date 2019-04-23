module.exports = {
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ],
    plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
    env: {
      "browser": true,
      "jasmine": true,
      "jest": true
    },
    settings: {
    react: {
        pragma: "React",
        version: "detect"
      }
    
    },
    rules: {
      //Eslint doesn't recognize interfaces as variables
      'no-undef': 'off',
      "react/prop-types": 0,
      'no-console': 'off',
    },
    parser: "@typescript-eslint/parser"
  }