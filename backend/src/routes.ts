import { Router } from "express";
import { CreateUserController } from "./controllers/user/createUserController";
import { AuthUserController } from "./controllers/user/authUserController";

const router = Router()

// Create User
router.post("/user", new CreateUserController().handle)
// Login
router.post("/session", new AuthUserController().handle)

//router.get("/teste", (req: Request, res: Response) => {
 //   return res.json({ nome: "Sujeito Pizza"})
//})

export { router }