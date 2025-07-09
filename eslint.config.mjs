import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// You might consider adding more ESLint rules/plugins here for a more robust setup,
// e.g., 'eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-plugin-jsx-a11y'
// and potentially 'eslint-config-prettier' if you use Prettier.
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;