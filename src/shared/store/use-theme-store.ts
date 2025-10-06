import { themeStorage } from "src/shared/utils"
import { create } from "zustand"

interface ThemeStore {
	isDark: boolean
	toggleDark: () => void
}

const useThemeStore = create<ThemeStore>()((set) => ({
	isDark: themeStorage.get(),
	toggleDark: () =>
		set((prev) => {
			const value = !prev.isDark
			themeStorage.set(value ? "dark" : "light")
			return { isDark: !prev.isDark }
		}),
}))

export { useThemeStore }
