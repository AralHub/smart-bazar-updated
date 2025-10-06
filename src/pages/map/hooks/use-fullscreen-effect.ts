import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

interface FullscreenEffectProps {
	isFullscreen: boolean
}

export const useFullscreenEffect = ({
	isFullscreen,
}: FullscreenEffectProps) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (isFullscreen) {
			navigate({
				from: "/d/$districtId/m/$marketId/map",
				to: ".",
				search: {
					fullscreen: `${isFullscreen}`,
				},
			})
		}
		return () => {
			navigate({
				to: ".",
				search: {
					fullscreen: undefined,
				},
			})
		}
	}, [isFullscreen, navigate])
	return {}
}
