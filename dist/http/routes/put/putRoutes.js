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
exports.putUser = putUser;
const shared_1 = require("../../../src/shared");
function putUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { nome, email, telefone } = req.body;
        try {
            const result = yield shared_1.pool.query("UPDATE usuarios SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *", [nome, email, telefone, id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            res.status(200).json(result.rows[0]);
        }
        catch (e) { }
    });
}
