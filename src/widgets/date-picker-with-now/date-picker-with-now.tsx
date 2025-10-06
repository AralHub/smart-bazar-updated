import { CalendarOutlined } from "@ant-design/icons"
import type { DatePickerProps } from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { type FC } from "react"
import { Button, DatePicker, SpaceCompact } from "src/shared/ui"

interface DatePickerWithNow extends DatePickerProps {
	onToday?: (date: Dayjs) => void
}

const DatePickerWithNow: FC<DatePickerWithNow> = ({ onToday, ...props }) => {
	return (
		<>
			<SpaceCompact>
				<DatePicker
					allowClear={false}
					{...props}
				/>
				<Button
					icon={<CalendarOutlined />}
					type={"primary"}
					onClick={() => onToday?.(dayjs())}
					size={props?.size}
				/>
			</SpaceCompact>
		</>
	)
}

export { DatePickerWithNow }
