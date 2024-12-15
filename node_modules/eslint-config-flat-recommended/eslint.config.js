import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import importLint from "eslint-plugin-import";
import reactLint from "eslint-plugin-react";
import hooksLint from "eslint-plugin-react-hooks";
import jsxLint from "eslint-plugin-jsx-a11y";
import stylisticLint from "@stylistic/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const createLintConfig = ({ name, files, plugins, languageOptions, rules }) => {
  const config = {};

  if (name) config.name = name;
  if (files) config.files = files;
  if (plugins) config.plugins = plugins;
  if (languageOptions) config.languageOptions = languageOptions;
  if (rules) config.rules = rules;

  return config;
};

const esLintConfig = (configType = "recommended") => {
  const config = eslint.configs[configType] ?? eslint.configs.recommended;

  return createLintConfig({
    name: "eslint",
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx"],
    rules: config.rules,
  });
};

const tsLintConfig = (configType = "recommended") => {
  const config = tslint.configs[configType] ?? tslint.configs.recommended;

  return createLintConfig({
    name: "typescript-eslint",
    files: ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx"],
    plugins: config[0].plugins,
    languageOptions: config[0].languageOptions,
    rules: { ...config[1].rules, ...config[2].rules },
  });
};

const importLintConfig = (configType = "recommended") => {
  const config =
    importLint.flatConfigs[configType] ?? importLint.flatConfigs.recommended;

  return createLintConfig({
    name: "import",
    files: [
      "**/*.js",
      "**/*.jsx",
      "**/*.mjs",
      "**/*.ts",
      "**/*.tsx",
      "**/*.mts",
    ],
    plugins: config.plugins,
    languageOptions: config.languageOptions,
    rules: config.rules,
  });
};

const reactLintConfig = (configType = "recommended") => {
  const config =
    reactLint.configs.flat[configType] ?? reactLint.configs.flat.recommended;

  return createLintConfig({
    name: "react",
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: config.plugins,
    languageOptions: config.languageOptions,
    rules: config.rules,
  });
};

const reactHooksLintConfig = () => {
  return createLintConfig({
    name: "react-hooks",
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: { "react-hooks": hooksLint },
    rules: hooksLint.configs.recommended.rules,
  });
};

const jsxLintConfig = (configType = "recommended") => {
  const config =
    jsxLint.flatConfigs[configType] ?? jsxLint.flatConfigs.recommended;

  return createLintConfig({
    name: "jsx-a11y",
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: config.plugins,
    languageOptions: config.languageOptions,
    rules: config.rules,
  });
};

const prettierLintConfig = () => {
  return createLintConfig({
    name: "prettier",
    files: [
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs",
      "**/*.ts",
      "**/*.mts",
      "**/*.cts",
      "**/*.jsx",
      "**/*.tsx",
    ],
    plugins: { prettier: prettierPlugin },
    rules: prettierConfig.rules,
  });
};

const stylisticLintConfig = (stylisticConfig = "recommended-flat") => {
  const disabledLegacyConfig = stylisticLint.configs["disable-legacy"];
  const config =
    stylisticLint.configs[stylisticConfig] ??
    stylisticLint.configs["recommended-flat"];
  return createLintConfig({
    name: "stylistic",
    files: [
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs",
      "**/*.ts",
      "**/*.mts",
      "**/*.cts",
      "**/*.jsx",
      "**/*.tsx",
    ],
    plugins: config.plugins,
    rules: { ...disabledLegacyConfig.rules, ...config.rules },
  });
};

export default function recommendedConfig(
  { js, ts, imports, react, prettier, stylistic } = {
    js: "recommended",
    ts: "recommended",
    imports: "recommended",
    react: "recommended",
    prettier: "recommended",
    stylistic: "recommended-flat",
  }
) {
  const config = [];

  if (js) config.push(esLintConfig());
  if (ts) config.push(tsLintConfig());
  // if (imports) config.push(importLintConfig());
  if (react) {
    config.push({
      ...reactLintConfig(),
      settings: {
        react: {
          version: "detect",
        },
      },
    });
    config.push(reactHooksLintConfig());
    config.push(jsxLintConfig());
  }
  if (prettier) config.push(prettierLintConfig());
  if (stylistic) config.push(stylisticLintConfig());

  return config;
}
