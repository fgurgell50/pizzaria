import { Request, Response } from "express";
import { AuthUserService } from "../../services/authUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {
        //console.log(req.body)

        const { email, password } = req.body 
        const authUserService = new AuthUserService()

        const auth = await authUserService.execute({
            email,
            password
        })

        return res.json(auth)
    }
}

export {
    AuthUserController
}