import axios from "axios"
import { BASE_URL } from "src/shared/config"
import { tokenStorage } from "src/shared/utils"

const api = axios.create({
	baseURL: `${BASE_URL}/api/v1/admin`,
})

const classic = axios.create({
	baseURL: `${BASE_URL}/api/v1`,
})

api.interceptors.request.use((config) => {
	const token = tokenStorage.get()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export { api, classic }
