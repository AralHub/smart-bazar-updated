import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState,
} from "react"
import { AuthContext } from "src/shared/context"
import {
	districtStorage,
	marketStorage,
	roleStorage,
	tokenStorage,
} from "src/shared/utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.get())
	const [role, setRole] = useState(() => roleStorage.get())
	const [market, setMarket] = useState(() => marketStorage.get())
	const [district, setDistrict] = useState(() => districtStorage.get())

	const login: AuthContext["login"] = (
		token,
		role,
		market,
		district,
		remember?: boolean
	) => {
		tokenStorage.set(token, remember)
		roleStorage.set(role, remember)
		setRole(role)
		if (market) {
			marketStorage.set(market, remember)
			setMarket(market)
		} else {
			marketStorage.clear()
			setMarket(null)
		}
		if (district) {
			districtStorage.set(district, remember)
			setDistrict(district)
		} else {
			districtStorage.clear()
			setDistrict(null)
		}
		setIsAuth(true)
	}

	const logout: AuthContext["logout"] = useCallback(() => {
		tokenStorage.clear()
		roleStorage.clear()
		marketStorage.clear()
		districtStorage.clear()
		setIsAuth(false)
		setDistrict(null)
		setMarket(null)
		setRole(null)
	}, [])

	const values = useMemo(
		() => ({
			isAuth,
			role,
			market,
			district,
		}),
		[district, isAuth, market, role]
	)

	const actions = useMemo(
		() => ({
			logout,
			login,
			setRole,
		}),
		[logout]
	)

	return (
		<AuthContext.Provider value={{ ...values, ...actions }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider }
