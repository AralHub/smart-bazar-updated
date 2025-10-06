import { type FC, type PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"

interface ContainerProps {
	isLarge?: boolean
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({
	children,
	isLarge,
}) => {
	const { token } = useToken()
	const { screenXL, screenXXL } = token

	return (
		<>
			<div
				style={{
					maxWidth: isLarge ? screenXXL : screenXL,
					margin: "0 auto",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					gap: 24,
				}}
			>
				{children}
			</div>
		</>
	)
}

export { Container }
