import type { TableColumnsType } from "src/shared/ui"

export const useCarMarketsDifferencesColumns = () => {
	const columns: TableColumnsType = [
		{
			ellipsis: false,
			title: "№",
			dataIndex: "index",
			key: "index",
			render: (_v, _r, index) => index + 1,
		},
	]

	return columns
}
