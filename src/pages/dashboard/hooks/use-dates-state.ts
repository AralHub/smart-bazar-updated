import dayjs, { type Dayjs } from "dayjs"
import { useState } from "react"

export const useDatesState = () => {
	const [dateByYear, setDateByYear] = useState(() => dayjs())
	const [dateByMonth, setDateByMonth] = useState(() => dayjs())
	const [datesByDay, setDatesByDay] = useState<[Dayjs | null, Dayjs | null]>(
		() => [dayjs().startOf("months"), dayjs().endOf("months")]
	)

	return {
		dateByYear,
		dateByMonth,
		datesByDay,
		setDateByYear,
		setDateByMonth,
		setDatesByDay,
	}
}
