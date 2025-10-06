import { type  FC } from "react"
import { Charts } from "src/shared/ui"
import {MarketsGeneralMonthlyIncomeOption} from "./markets-general-monthly-income.option.ts"

const MarketsGeneralMonthlyIncomeChart: FC = () => {
	
	const option = MarketsGeneralMonthlyIncomeOption()
	return (
		<>
			<Charts option={option} />
		</>
	)
}

export { MarketsGeneralMonthlyIncomeChart }
