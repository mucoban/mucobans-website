import axios from "axios"
import {globals} from "../globals";

const AuthService = {}

AuthService.initialLogin = () => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.get(`${globals.api}detail`, { headers: { authorization: `Bearer ${token}` } })
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
