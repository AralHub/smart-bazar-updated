import { useCallback, useEffect, useRef, useState } from "react"

export const useFullscreenRef = (value: boolean = false) => {
	const containerRef = useRef<HTMLDivElement>(null)

	const [isFullscreen, setIsFullscreen] = useState(value)

	const toggleFullscreen = useCallback(() => {
		const elem = containerRef.current
		if (!elem) return

		if (!document.fullscreenElement) {
			elem.requestFullscreen?.()
			setIsFullscreen(true)
		} else {
			document.exitFullscreen?.()
			setIsFullscreen(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener("fullscreenchange", () => {
			setIsFullscreen(!!document.fullscreenElement)
		})

		return () => {
			document.removeEventListener("fullscreenchange", () => void 0)
		}
	}, [])
	return {
		containerRef,
		isFullscreen,
		toggleFullscreen,
	}
}
