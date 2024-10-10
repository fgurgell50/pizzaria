import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://localhost:3333'
    baseURL: 'http://192.168.15.2:3333'
    //baseURL: 'http://179.83.103.71:3333'
    //
    //192.168.15.4 - 13/09
    //192.168.15.2
    //192.168.15.2

})

export { api }