import Cookies from "js-cookie"

export const StorageKeys = {
	TOKEN: "token",
	ROLE: "role",
	MARKET: "market",
	DISTRICT: "district",
	THEME: "theme",
} as const

export const tokenStorage = {
	get: (): string | null => Cookies.get(StorageKeys.TOKEN) || null,
	set: (token: string, remember?: boolean) => {
		Cookies.set(StorageKeys.TOKEN, token, {
			expires: remember ? 30 : 15,
		})
	},
	clear(): void {
		Cookies.remove(StorageKeys.TOKEN)
	},
}

export const roleStorage = {
	get: (): number | null => Number(Cookies.get(StorageKeys.ROLE)),
	set: (role: number, remember?: boolean) => {
		Cookies.set(StorageKeys.ROLE, `${role}`, {
			expires: remember ? 30 : 15,
		})
	},
	clear(): void {
		Cookies.remove(StorageKeys.ROLE)
	},
}

export const marketStorage = {
	get: (): number | null => Number(Cookies.get(StorageKeys.MARKET)) || null,
	set: (market: number, remember?: boolean) => {
		Cookies.set(StorageKeys.MARKET, `${market}`, {
			expires: remember ? 30 : 15,
		})
	},
	clear(): void {
		Cookies.remove(StorageKeys.MARKET)
	},
}

export const districtStorage = {
	get: (): number | null => Number(Cookies.get(StorageKeys.DISTRICT)) || null,
	set: (district: number, remember?: boolean) => {
		Cookies.set(StorageKeys.DISTRICT, `${district}`, {
			expires: remember ? 30 : 15,
		})
	},
	clear(): void {
		Cookies.remove(StorageKeys.DISTRICT)
	},
}

export const themeStorage = {
	get: (): boolean => Boolean(Cookies.get(StorageKeys.THEME) === "dark"),
	set: (theme: string) => {
		Cookies.set(StorageKeys.THEME, theme, {
			expires: 30,
		})
	},
	clear(): void {
		Cookies.remove(StorageKeys.THEME)
	},
}
