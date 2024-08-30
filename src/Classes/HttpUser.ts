import { Request, Response } from "express";
import { Pool } from "pg";

export default class HttpUser {
  protected url;
  protected pool;

  constructor(url: string, pool: Pool) {
    this.url = url;
    this.pool = pool;
  }

  setHeaders(res: Response) {
    res.header({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    });
  }

  async get(res: Response) {
    let data;
    try {
      data = await this.pool.connect();
      const result = await data.query("SELECT * FROM usuarios");
      res.json(result.rows);
    } catch (err) {
      console.error("Erro ao obter usuários:", err);
      res.status(500).json({ error: "Erro ao obter usuários" });
    } finally {
      if (data) data.release();
    }
  }

  async post(req: Request, res: Response) {
    const { nome, email, telefone } = req.body;
    try {
      const result = await this.pool.query(
        "INSERT INTO usuarios (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *",
        [nome, email, telefone]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async put(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    try {
      const result = await this.pool.query(
        "UPDATE usuarios SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *",
        [nome, email, telefone, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.pool.query(
        "DELETE FROM usuarios WHERE id = $1 RETURNING *",
        [id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}
