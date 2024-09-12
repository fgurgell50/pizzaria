import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://localhost:3333'
    baseURL: 'http://192.168.15.2:3333'
    //192.168.15.2
    //192.168.15.2
})

export { api }