/* eslint-disable no-undef */

module.exports = {
  testEnvironment: "node", // ou 'jsdom' para testar no navegador
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Para usar TypeScript
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
};
