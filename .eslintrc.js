module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        es6: true
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    plugins: ["@typescript-eslint", "react-hooks", "simple-import-sort"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "simple-import-sort/sort": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "@typescript-eslint/no-use-before-define": [
            "error",
            { functions: false }
        ],
        "react/display-name": "off"
    }
};
