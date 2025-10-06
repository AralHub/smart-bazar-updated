import { createContext } from "react"

export interface AuthContext {
	isAuth: boolean
	role: number | null
	setRole: (role: number) => void
	district: number | null
	market: number | null
	login: (
		token: string,
		role: number,
		market: number | null,
		district: number | null,
		remember?: boolean
	) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContext | null>(null)
