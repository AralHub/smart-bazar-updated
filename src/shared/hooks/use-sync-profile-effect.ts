import { useEffect } from "react"
import { useGetProfileQuery } from "src/services/auth"
import { useAuth } from "src/shared/hooks/use-auth.ts"

export const useSyncProfileEffect = () => {
	const { data: profile } = useGetProfileQuery()
	const { setRole } = useAuth()
	useEffect(() => {
		if (profile?.data?.role) {
			setRole(profile?.data?.role)
		}
	}, [profile?.data?.role, setRole])
	return {}
}
