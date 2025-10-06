declare type OnEvents = {
	legendselectchanged: (params: {
		name: string
		selected: Record<string, boolean>
		type: string
	}) => void
}
