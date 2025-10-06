import { SearchOutlined } from "@ant-design/icons"
import { forwardRef, useEffect, useState } from "react"
import { Input, type InputProps, type InputRef } from "./"

export interface InputSearchProps
	extends Omit<InputProps, "onChange" | "value"> {
	onChange?: (value: string) => void
	value?: string
	delay?: number
}

const InputSearch = forwardRef<InputRef, InputSearchProps>(
	({ value = "", onChange, delay = 500, ...props }, ref) => {
		const [currentValue, setCurrentValue] = useState(value)

		useEffect(() => {
			if (!onChange) return
			const timer = setTimeout(() => {
				onChange?.(currentValue)
			}, delay)

			return () => {
				clearTimeout(timer)
			}
		}, [currentValue, delay, onChange])
		return (
			<Input
				allowClear={true}
				prefix={<SearchOutlined />}
				placeholder={"Izlew..."}
				ref={ref}
				value={currentValue}
				onChange={(e) => setCurrentValue(e.target.value)}
				{...props}
			/>
		)
	}
)
InputSearch.displayName = "InputSearch"

export default InputSearch
