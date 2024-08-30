"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const shared_1 = require("./src/shared");
const HttpUser_1 = __importDefault(require("./http/headers/HttpUser"));
const app = (0, express_1.default)();
const PORT = 5500;
class App extends HttpUser_1.default {
    main() {
        app.use((req, res, next) => {
            this.setHeaders(res);
            next();
        });
        app.use(body_parser_1.default.json());
        app.get(this.url, (req, res) => this.get(res));
        app.put(this.url + "/:id", (req, res) => this.put(req, res));
        app.delete(this.url + "/:id", (req, res) => this.delete(req, res));
        app.post(this.url, (req, res) => this.post(req, res));
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
        });
    }
}
const mainApp = new App("/users", shared_1.pool);
mainApp.main();
