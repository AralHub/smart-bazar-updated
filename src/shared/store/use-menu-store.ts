import { create } from "zustand"

interface MenuStore {
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
	toggleCollapsed: () => void
}

const useMenuStore = create<MenuStore>()((set) => ({
	collapsed: false,
	setCollapsed: (collapsed) => set({ collapsed }),
	toggleCollapsed: () => set((prev) => ({ collapsed: !prev.collapsed }))
}))

export { useMenuStore }
