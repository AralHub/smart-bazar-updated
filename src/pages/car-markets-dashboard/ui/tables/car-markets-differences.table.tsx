import { type FC } from "react"
import { useCarMarketsDifferencesColumns } from "src/pages/car-markets-dashboard/hooks"
import { Table } from "src/shared/ui"

const CarMarketsDifferencesTable: FC = () => {
	const columns = useCarMarketsDifferencesColumns()
	return (
		<>
			<Table
				title={"Tusimler ayırmalari"}
				columns={columns}
			/>
		</>
	)
}

export { CarMarketsDifferencesTable }
