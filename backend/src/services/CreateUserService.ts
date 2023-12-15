import prismaClient from "../prisma"
import { hash } from "bcryptjs"

interface UserRequest{
    name: string
    email: string
    password: string

}

class CreateUserService {
    async execute( { name, email, password } : UserRequest ) {

        if (!email) {
            throw new Error("Email Incorrect.")
        }

        // verificar se email já existe
        const userAlreadyExists = await prismaClient.user.findFirst({ 
            where: {
                email: email
            }
         })

         if (userAlreadyExists){
            throw new Error("User already exists.")
         }

         // criptografia da senha
         const pwdHash = await hash(password, 8)

         const user =await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: pwdHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
         })

        //console.log("user", user)
        return user
    }
}

export {
    CreateUserService
}