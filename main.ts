import App from "./src/Classes/App";
import { pool } from "./src/api/database/dataBase";

const mainApp = new App("/users", pool);

mainApp.init();
