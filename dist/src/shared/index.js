"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.express = exports.bodyParser = exports.pool = exports.app = void 0;
const bancoDeDados_1 = require("./database/bancoDeDados");
Object.defineProperty(exports, "pool", { enumerable: true, get: function () { return bancoDeDados_1.pool; } });
const body_parser_1 = __importDefault(require("body-parser"));
exports.bodyParser = body_parser_1.default;
const express_1 = __importDefault(require("express"));
exports.express = express_1.default;
const app = (0, express_1.default)();
exports.app = app;
