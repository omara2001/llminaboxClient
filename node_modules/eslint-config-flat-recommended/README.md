# eslint-config-flat-recommended

[npm package](https://www.npmjs.com/package/eslint-config-flat-recommended)

This is an NPM package that provides a simple, recommended, flexible, and configurable ESLint setup (flat config), allowing you to easily configure and extend your linting setup based on your project needs. The package supports JavaScript, TypeScript, React, and stylistic linting and Prettier integration.

## Features

- **JavaScript and TypeScript support**: Linting for JavaScript and TypeScript.
- **React and JSX support**: Includes rules for React, React hooks and JSX.
- **Prettier integration**: Use Prettier for code formatting.
- **Stylistic linting**: Optionally enforces consistent code style across your project.

## Installation

To install the package, run the following command:

```bash
npm i -D eslint-config-flat-recommended
```

## Usage

You can use the `recommendedConfig` function to generate an ESLint configuration tailored to your project. the configuration includes rules for JavaScript, TypeScript, imports, React, Prettier, and stylistic.

### Example

```javascript
// eslint.config.js file

import recommendedConfig from "eslint-config-flat-recommended";

export default recommendedConfig();
```

### Options

```javascript
// Example ESLint configuration
const eslintConfig = recommendedConfig({
  js: "recommended", // Include JavaScript linting (default: "recommended")
  ts: "recommended", // Include TypeScript linting (default: "recommended")
  react: "recommended", // Include React linting (default: "recommended")
  prettier: "recommended", // Include Prettier integration (default: "recommended")
  stylistic: "recommended-flat", // Include stylistic (default: "recommended-flat")
});
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Mohamed Tharwat
