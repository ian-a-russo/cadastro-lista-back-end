import HttpUser from "./HttpUser";
import express from "express";
import bodyParser from "body-parser";

export default class App extends HttpUser {
  init() {
    const app = express();
    const PORT = 5500;

    app.use((req, res, next) => {
      this.setHeaders(res);
      next();
    });

    app.use(bodyParser.json());

    app.get(this.url, (req, res) => this.get(res));
    app.put(this.url + "/:id", (req, res) => this.put(req, res));
    app.delete(this.url + "/:id", (req, res) => this.delete(req, res));
    app.post(this.url, (req, res) => this.post(req, res));

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
    });
  }
}
