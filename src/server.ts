import express, { Request, Response, NextFunction } from "express";

const app = express();

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World"
    })
});

app.get("/status", (req:Request, res:Response, next:NextFunction ) => {
  res.status(200).send({World:"Mudeiiii"})
})

app.listen(3333, () => console.log("Server's running"));
