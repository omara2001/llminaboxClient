import recommendedConfig from "eslint-config-flat-recommended";
import globals from "globals";

export default [
  ...recommendedConfig({
    js: "recommended",
    ts: "recommended",
    imports: "recommended",
    react: "recommended",
    prettier: "recommended",
    stylistic: ""
  }),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
];
