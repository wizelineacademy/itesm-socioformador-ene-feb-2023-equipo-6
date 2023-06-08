/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "no-mixed-operators": "off",
    "no-sequences": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-unused-expressions": "off"
  }
};
