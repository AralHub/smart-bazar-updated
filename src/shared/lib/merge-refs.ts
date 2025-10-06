import type { MutableRefObject, Ref, RefCallback } from "react"

export function mergeRefs<T = unknown>(
	...refs: (Ref<T> | undefined)[]
): RefCallback<T> {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(value)
			} else if (ref && "current" in ref) {
				;(ref as MutableRefObject<T | null>).current = value
			}
		})
	}
}
