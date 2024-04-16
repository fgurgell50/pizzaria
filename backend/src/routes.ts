import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController"
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import uploadConfig from './config/multer'


const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// Create User
router.post("/user", new CreateUserController().handle)
// Login
router.post("/session", new AuthUserController().handle)
// Detail User
router.get('/me', isAuthenticated, new DetailUserController().handle)

// Rotas de Categorias
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// Rotas de Produtos
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/products', isAuthenticated, new ListByCategoryController().handle  )

//router.get("/teste", (req: Request, res: Response) => {
 //   return res.json({ nome: "Sujeito Pizza"})
//})

export { router }