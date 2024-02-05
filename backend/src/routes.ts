import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController"
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router()

// Create User
router.post("/user", new CreateUserController().handle)
// Login
router.post("/session", new AuthUserController().handle)
// Detail User
router.get('/me', isAuthenticated, new DetailUserController().handle)

// Rotas de Categorias
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('')

//router.get("/teste", (req: Request, res: Response) => {
 //   return res.json({ nome: "Sujeito Pizza"})
//})

export { router }