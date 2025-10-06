import { type FC, useEffect, useState } from "react"
import CountUp, { type CountUpProps } from "react-countup"

const Count: FC<CountUpProps> = ({ end, style, ...props }) => {
	const [prev, setPrev] = useState(0)
	const [current, setCurrent] = useState(0)
	useEffect(() => {
		if (!isNaN(Number(end))) {
			setCurrent((prevEnd) => {
				setPrev(prevEnd)
				return end
			})
		}
	}, [end])
	return (
		<>
			<CountUp
				style={{
					whiteSpace: "nowrap",
					...style,
				}}
				start={prev}
				end={current}
				useEasing={true}
				duration={3}
				{...props}
			/>
		</>
	)
}

export { Count }
