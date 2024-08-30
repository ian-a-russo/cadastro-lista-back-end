"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class HttpUser {
    constructor(url, pool) {
        this.url = url;
        this.pool = pool;
    }
    setHeaders(res) {
        res.header({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        });
    }
    get(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this.pool.connect();
                const result = yield data.query("SELECT * FROM usuarios");
                res.json(result.rows);
            }
            catch (err) {
                console.error("Erro ao obter usuários:", err);
                res.status(500).json({ error: "Erro ao obter usuários" });
            }
            finally {
                if (data)
                    data.release();
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, telefone } = req.body;
            try {
                const result = yield this.pool.query("INSERT INTO usuarios (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *", [nome, email, telefone]);
                res.status(201).json(result.rows[0]);
            }
            catch (err) {
                console.error("Erro ao criar usuário:", err);
                res.status(500).json({ error: "Erro ao criar usuário" });
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nome, email, telefone } = req.body;
            try {
                const result = yield this.pool.query("UPDATE usuarios SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *", [nome, email, telefone, id]);
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
                res.status(200).json(result.rows[0]);
            }
            catch (err) {
                console.error("Erro ao atualizar usuário:", err);
                res.status(500).json({ error: "Erro ao atualizar usuário" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield this.pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
                res.status(200).json(result.rows[0]);
            }
            catch (err) {
                console.error("Erro ao deletar usuário:", err);
                res.status(500).json({ error: "Erro ao deletar usuário" });
            }
        });
    }
}
exports.default = HttpUser;
