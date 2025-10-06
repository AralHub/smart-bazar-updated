import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const useMapTabs = () => {
	const { map } = useSearch({
		strict: false,
	})
	const navigate = useNavigate()
	const [mapTab, setMapTab] = useState(map || "1")

	useEffect(() => {
		if (mapTab !== "1") {
			navigate({
				to: ".",
				resetScroll: false,
				search: (prev) => ({
					...prev,
					map: mapTab,
				}),
			})
		}

		return () => {
			navigate({
				to: ".",
				resetScroll: false,
				search: (prev) => ({
					...prev,
					map: undefined,
				}),
			})
		}
	}, [mapTab, navigate])
	return {
		mapTab,
		setMapTab,
	}
}
