export const errorSchema = Array.from({ length: 24 }).map(
	() => `${Math.round(1 + Math.random() * 1000)}`
)

export const warningSchema = Array.from({ length: 24 }).map(() => {
	let digit = Math.round(1 + Math.random() * 1000)
	while (errorSchema.includes(`${digit}`)) {
		digit = Math.round(1 + Math.random() * 1000)
	}
	return `${digit}`
})
