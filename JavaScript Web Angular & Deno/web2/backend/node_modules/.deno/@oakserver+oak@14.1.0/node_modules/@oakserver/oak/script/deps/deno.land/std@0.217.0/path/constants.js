"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEPARATOR_PATTERN = exports.SEPARATOR = exports.DELIMITER = void 0;
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const _os_js_1 = require("./_os.js");
exports.DELIMITER = _os_js_1.isWindows ? ";" : ":";
exports.SEPARATOR = _os_js_1.isWindows ? "\\" : "/";
exports.SEPARATOR_PATTERN = _os_js_1.isWindows ? /[\\/]+/ : /\/+/;
