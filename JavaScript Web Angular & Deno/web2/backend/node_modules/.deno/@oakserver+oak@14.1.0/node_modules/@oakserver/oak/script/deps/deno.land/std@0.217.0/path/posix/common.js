"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
const common_js_1 = require("../_common/common.js");
const constants_js_1 = require("./constants.js");
/** Determines the common path from a set of paths, using an optional separator,
 * which defaults to the OS default separator.
 *
 * ```ts
 *       import { common } from "https://deno.land/std@$STD_VERSION/path/mod.ts";
 *       const p = common([
 *         "./deno/std/path/mod.ts",
 *         "./deno/std/fs/mod.ts",
 *       ]);
 *       console.log(p); // "./deno/std/"
 * ```
 */
function common(paths, sep = constants_js_1.SEPARATOR) {
    return (0, common_js_1._common)(paths, sep);
}
exports.common = common;
