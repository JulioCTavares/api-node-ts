import express from "express";
import errorHandler from "./middlewares/error.handler.middleware";
import statusRoute from "./routes/status.route";
import userRouter from "./routes/user.route";

const app = express();

//Configuração da aplicação
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// Rotas da aplicação
app.use(statusRoute)
app.use(userRouter)

//Configuração de Handlers
app.use(errorHandler)

//Inicialização da aplicação
app.listen(3333, () => console.log("Server's running"));
