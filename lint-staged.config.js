/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
    "*.{js, jsx, ts, tsx, css, json, html}": "prettier --write",
};
