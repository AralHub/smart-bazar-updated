import { type FC } from "react"
import { Flex, Skeleton } from "src/shared/ui"

interface SidebarLoadingProps {
	collapsed?: boolean
}

const SidebarLoading: FC<SidebarLoadingProps> = ({ collapsed }) => {
	return (
		<>
			<Flex
				vertical={true}
				gap={8}
			>
				{Array.from({ length: 3 }).map((_, index) => (
					<Flex
						key={index}
						vertical={true}
						gap={8}
					>
						{collapsed ? null : (
							<Skeleton.Input
								active={true}
								style={{
									minWidth: 0,
									marginBlock: 4,
								}}
								size={"small"}
							/>
						)}
						{Array.from({ length: index + 1 }).map((_, index) => (
							<Skeleton.Input
								key={index}
								active={true}
								style={{
									minWidth: 0,
								}}
								size={"large"}
								block={true}
							/>
						))}
					</Flex>
				))}
			</Flex>
		</>
	)
}

export { SidebarLoading }
