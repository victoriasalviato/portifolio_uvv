/* eslint-disable no-undef */
module.exports = {
  parser: "@typescript-eslint/parser", // Defina o parser do ESLint para TypeScript
  extends: [
    "eslint:recommended", // Habilita as regras padrão
    "plugin:@typescript-eslint/recommended", // Regras recomendadas para TypeScript
    "prettier", // Integração com o Prettier para formatação
  ],
  parserOptions: {
    ecmaVersion: 2020, // Permite o uso de recursos mais recentes do JavaScript
    sourceType: "module", // Permite o uso de módulos
  },
  env: {
    browser: true, // Defina o ambiente se for para o navegador
    node: true, // Defina o ambiente para Node.js se necessário
  },
  rules: {
    // Adicione regras personalizadas ou altere as existentes
    "@typescript-eslint/no-unused-vars": "warn", // Exemplo de regra personalizada
  },
};
