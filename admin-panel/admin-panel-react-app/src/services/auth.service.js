import axios from "axios"
import {globals} from "../globals";

const setInterceptors = (token) => {
    axios.interceptors.request.clear()
    axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    axios.interceptors.response.use(
        (response) => {
            if (response.data.error) { return Promise.reject('error') }
            return response;
        },
        (error) => {
            return error
        }
    )
}

const AuthService = {}

AuthService.initialLogin = () => {
    const token = localStorage.getItem('token')
    if (token) {
        setInterceptors(token)

        axios.get(`${globals.api}detail`)
            .then(response => {
                if (response.data.status) sessionStorage.setItem('token', `${token}`)
                else sessionStorage.removeItem('token')
            })
            .catch(error => {
                if (error.response.data.message) sessionStorage.removeItem('token')
            })
    }
    else sessionStorage.removeItem('token')
}

AuthService.login = (data) => {
    return new Promise((resolve) => {
        axios.post(`${globals.api}login`, data)
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('token', `${response.data.token}`)
                    sessionStorage.setItem('token', `${response.data.token}`)
                    setInterceptors(response.data.token)
                }
                resolve(response.data)
            })
            .catch(error => {
                resolve(false)
            })
    })

}

AuthService.logout = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
}

export default AuthService
