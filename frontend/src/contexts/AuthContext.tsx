import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { api } from "../services/apiClient";
import path from "path";


type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: ( credentilas: SignInProps ) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}
type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({ } as AuthContextData )

export function signOut(){
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push("/")
    } catch (error) {
        console.log("Erro ao deslogar.")
    }
}

export function AuthProvider({ children }: AuthProviderProps  ){

    const [user, setUser] = useState<UserProps | null>(null)
    const isAuthenticated = !!user; // convert par afalse qdo estiver vazio

    async function signIn( { email, password}: SignInProps ){
        
        try {
            const response = await api.post('/session', {
                email,
                password
            })
            //console.log(response.data);

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // expira em um mês
                path: "/"
            })

            setUser({
                id,
                name,
                email,
            })

            //Passar para proximas requisicoes o Token

            api.defaults.headers['Authorization'] = `Bearer ${token}`

        //Redirecionar para a pagina /dashboard
        Router.push('/dashboard')

        } catch (err) {
            console.log("Erro ao Acessar", err)
        }
        
    }
    

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}