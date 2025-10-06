export function calculateDiffValue(oldValue: number, newValue: number) {
	const diff = newValue - oldValue
	const percent = oldValue === 0 ? 0 : (diff / oldValue) * 100
	
	return { diff, percent }
}
