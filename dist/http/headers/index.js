"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeaders = setHeaders;
function setHeaders(res) {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    });
}
