import { Router } from "express";
import authRouter from "./auth"

const routes = Router()

routes.use("/all", authRouter)

export default routes