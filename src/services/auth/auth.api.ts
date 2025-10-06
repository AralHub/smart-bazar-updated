import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { useAuth } from "src/shared/hooks"
import { authService } from "./auth.service"

const useGetProfileQuery = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const auth = useAuth()

	return useCrudQuery({
		queryFn: authService.getProfile,
		queryKey: ["auth"],
		errorRedirect: {
			to: "/login",
			replace: true,
		},
		onError: () => {
			auth.logout()
			queryClient.removeQueries({
				queryKey: ["auth"],
			})
			navigate({
				to: "/login",
				replace: true,
			})
		},
	})
}

const useLoginMutation = () => {
	return useCrudMutation({
		mutationFn: authService.login,
		invalidate: {
			queryKey: ["auth"],
		},
		renderSuccess: () => ({
			description: "Siz sistemaǵa kirdińiz",
		}),
	})
}

const useEditProfileMutation = () => {
	return useCrudMutation({
		mutationFn: authService.editProfile,
		invalidate: {
			queryKey: ["auth"],
		},
		renderSuccess: () => ({
			description: "Profil maǵlıwmatları ózgertildi",
		}),
	})
}

const useLogoutMutation = () => {
	return useCrudMutation({
		mutationFn: authService.logout,
		renderSuccess: () => ({
			description: "Siz sistemadan shiqtińiz",
		}),
		onSuccessQueryClient: (queryClient) => {
			queryClient.removeQueries({
				queryKey: ["auth"],
			})
		},
	})
}

export {
	useGetProfileQuery,
	useLoginMutation,
	useEditProfileMutation,
	useLogoutMutation,
}
