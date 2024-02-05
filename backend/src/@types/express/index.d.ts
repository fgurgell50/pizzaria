declare namespace Express{
    export interface Request{
        user_id: string
    }
}

// precisa ir no tsconfig.json  e habilitar a variável "typeRoots": ["./src/@types"],