import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { toast } from "react-toastify";
import { api } from "../services/apiClient";
import path from "path";


type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: ( credentilas: SignInProps ) => Promise<void>;
    signOut: () => void;
    signUp: ( credentilas: SignUpProps ) => Promise<void>;
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

type SignUpProps = {
    name: string;
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

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies()
        if(token){
            api.get('/me').then(response => {
                const { id, name, email } = response.data

                setUser({
                    id,
                    name,
                    email
                })

            })
            .catch(() => {
                //se deu erro deslogamos
                signOut()
            })
        }

    }, [] )

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

            toast.success("Logado com Sucesso!")

        //Redirecionar para a pagina /dashboard
        Router.push('/dashboard')

        } catch (err) {
            toast.error("Erro ao acessar!")
            console.log("Erro ao Acessar", err)
        }
        
    }

    async function signUp( { name, email, password}: SignUpProps ){
        
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })
        toast.success("Conta criada com sucesso!")

        //Redirecionar para a pagina /dashboard
        Router.push('/')

        } catch (err) {
            toast.error("Erro ao cadastrar a conta!")
            console.log("Erro ao Acessar", err)
        }
        
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}