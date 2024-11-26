"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeGlob = void 0;
const normalize_js_1 = require("./normalize.js");
const constants_js_1 = require("./constants.js");
/** Like normalize(), but doesn't collapse "**\/.." when `globstar` is true. */
function normalizeGlob(glob, { globstar = false } = {}) {
    if (glob.match(/\0/g)) {
        throw new Error(`Glob contains invalid characters: "${glob}"`);
    }
    if (!globstar) {
        return (0, normalize_js_1.normalize)(glob);
    }
    const s = constants_js_1.SEPARATOR_PATTERN.source;
    const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
    return (0, normalize_js_1.normalize)(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
exports.normalizeGlob = normalizeGlob;
