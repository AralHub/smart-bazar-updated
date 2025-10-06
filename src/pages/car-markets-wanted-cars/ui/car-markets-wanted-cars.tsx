import { type FC } from "react"
import { CarMarketsWantedCarsForm } from "./forms"
import { CarMarketsWantedCarsTable } from "./tables"

const CarMarketsWantedCars: FC = () => {
	return (
		<>
			<CarMarketsWantedCarsForm />
			<CarMarketsWantedCarsTable />
		</>
	)
}

export { CarMarketsWantedCars }
