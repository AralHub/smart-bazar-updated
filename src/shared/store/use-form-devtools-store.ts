import { create } from "zustand"
import { devtools } from "zustand/middleware"

export const FormKeys = {
	MAIN: "main",
	PRIMARY: "primary",
	SECONDARY: "secondary",
	TERTIARY: "tertiary"
} as const
export type FormKey = (typeof FormKeys)[keyof typeof FormKeys]

export type FormParams = Record<string, unknown>

interface FormDevtoolsStore {
	open: boolean
	toggleOpen: (key?: FormKey) => void
	key: FormKey
	params: FormParams | null
	setParams: (params: FormParams, key?: FormKey) => void
	getParams: <T>() => T | null
	reset: () => void
}

const useFormDevtoolsStore = create(
	devtools<FormDevtoolsStore>(
		(set, get) => ({
			open: false,
			toggleOpen: (key) =>
				set((prev) => ({ open: !prev.open, key: key || FormKeys.MAIN })),
			key: FormKeys.MAIN,
			params: null,
			setParams: (params, key) =>
				set({ params, open: true, key: key || FormKeys.MAIN }),
			getParams: <T>() => {
				const { params } = get()
				if (!params) return null
				return params as T
			},
			reset: () => set({ params: null, open: false, key: FormKeys.MAIN })
		}),
		{
			name: "form",
			anonymousActionType: "form"
		}
	)
)

export { useFormDevtoolsStore }
