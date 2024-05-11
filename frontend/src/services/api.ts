import axios, { AxiosError } from 'axios'
import { error } from 'console';
import { parseCookies } from 'nookies'
import { AuthTokenError } from './error/AuthTokenError';
import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333', 
        headers:{
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    }) 

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError )=>{
        if(error.status === 401){
            //devemos deslogar o usuário
            if(typeof window !== undefined){
                //chamar a funcao para deslogar o usuário
                signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)
    })

    return api;

}