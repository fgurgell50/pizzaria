import prismaClient from "../../prisma";

import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

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

        
        // Verificar se a senha está correta
        const pwdMatch = await compare(password, user.password)
        //console.log(pwdMatch)
        if (!pwdMatch) {
            throw new Error("User/Password Incorrect.")
        }

        // se deu certo vamos gerar o Token par ao usuário
        const token = sign(
            // os dados q vao fazer parte do payload
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET || 'default_secret', // Use uma chave secreta de ambiente ou uma padrão
        {
                subject: user.id,
                expiresIn: '30d' // Exemplo de definição de validade do token
            }
        );

        return { 
            id: user.id,
            name: user.name,
            email: user.email,  
            token };
    }
}

export {
    AuthUserService
}

