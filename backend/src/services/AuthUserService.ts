import prismaClient from "../prisma";

import { compare } from "bcryptjs";


interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {
    async execute( { email, password }: AuthRequest ) {
        //console.log(password)

    // verificar se email já existe
    const user = await prismaClient.user.findFirst({ 
        where: {
            email: email
        }
        })

        if (!user){
        throw new Error("User/Password Incorrect.")
        }    

    
    // Verificar se a sneha está correta
    const pwdMatch = await compare(password, user.password)
    //console.log(pwdMatch)
    if (!pwdMatch) {
        throw new Error("User/Password Incorrect.")
    }


        return { ok: true }



    }
}

export {
    AuthUserService
}

