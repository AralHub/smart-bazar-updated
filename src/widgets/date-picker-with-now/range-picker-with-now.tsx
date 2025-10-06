import { CalendarOutlined } from "@ant-design/icons"
import type { RangePickerProps } from "antd/es/date-picker"
import dayjs, { type Dayjs } from "dayjs"
import { type FC } from "react"
import { Button, DatePicker, SpaceCompact } from "src/shared/ui"

interface DatePickerWithNow extends RangePickerProps {
	onToday?: (dates: [Dayjs, Dayjs]) => void
}

const RangePickerWithNow: FC<DatePickerWithNow> = ({ onToday, ...props }) => {
	return (
		<>
			<SpaceCompact>
				<DatePicker.RangePicker
					allowClear={false}
					{...props}
				/>
				<Button
					icon={<CalendarOutlined />}
					type={"primary"}
					onClick={() =>
						onToday?.([dayjs().startOf("month"), dayjs().endOf("month")])
					}
					size={props?.size}
				/>
			</SpaceCompact>
		</>
	)
}

export { RangePickerWithNow }
