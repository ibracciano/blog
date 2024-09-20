
import axios from "axios"
import { api } from "./api"
axios.defaults.withCredentials = true

export const getUserAuthentificated = async () => {
    try {
        const response = await axios.get(api.AuthVerify)
        return response.data.user
    } catch (error) {
        console.log("Erreur dans getUserAuthentificated hook", error.response.message)
    }
}

export const verifyUserAuthentication = async () => {
    try {
        const response = await axios.get(api.AuthVerify)
        if (!response.data.success) {
            window.location.href = "/"
        }
    } catch (error) {
        if (error) {
            window.location.reload()
            window.location.href = "/"
        }
    }
    return null
}