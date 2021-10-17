import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const userRouter = Router();

userRouter.get("/users", (req:Request, res:Response, next:NextFunction) => {
    const users = [{userName: "Julio"}]
    res.status(200).send(users)
});

userRouter.get("/users/:uuid", (req:Request<{uuid: string}>, res:Response, next:NextFunction) => {
  const uuid = req.params.uuid;

  res.status(StatusCodes.OK).send({ uuid })
});

userRouter.post("/users", (req:Request, res:Response, next:NextFunction) => {
  const newUser = req.body

  console.log(req.body)
  res.status(StatusCodes.CREATED).send(newUser)
});

userRouter.put("/users/:uuid", (req:Request<{uuid: string}>, res:Response, next:NextFunction) => {
  const uuid = req.params.uuid 
  const modifiedUser = req.body

  modifiedUser.uuid = uuid

  res.status(StatusCodes.OK).send({modifiedUser })
});

userRouter.delete("/users/:uuid", (req:Request<{uuid: string}>, res:Response, next:NextFunction) => {
  res.sendStatus(StatusCodes.OK)
});

export default userRouter;