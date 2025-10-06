import { type FC, type ReactNode } from "react"
import { Card, Count, Flex, Title } from "src/shared/ui"

interface CardCountProps {
	title: string
	value: number
	loading?: boolean
	extra?: ReactNode
	hoverable?: boolean
	onClick?: () => void
	action?: ReactNode
}

const CardCount: FC<CardCountProps> = ({
	title,
	value,
	loading,
	action,
	onClick,
	extra,
	hoverable,
}) => {
	return (
		<>
			<Card
				hoverable={hoverable}
				title={title}
				loading={loading}
				extra={extra}
				onClick={onClick}
				actions={action ? [action] : undefined}
			>
				<Flex
					justify={"center"}
					align={"center"}
					style={{
						aspectRatio: 16 / 7,
					}}
				>
					<Title style={{ textAlign: "center", fontSize: 48 }}>
						<Count end={value} />
					</Title>
				</Flex>
			</Card>
		</>
	)
}

export { CardCount }
