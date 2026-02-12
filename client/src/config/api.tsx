import axios from "axios"

const api = axios.create({
    baseURL: (import.meta as any).env.VITE_BASE_URL || 'HTTP://localhost:3000',
    withCredentials:true
})

export default api