import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import {
	Flex,
	type FlexProps,
	LayoutContent,
	type LayoutProps,
} from "src/shared/ui"

interface MainContentProps extends LayoutProps {
	flexProps?: Omit<FlexProps, "children">
}

const MainContent: FC<MainContentProps> = ({
	children,
	flexProps,
	...props
}) => {
	const { token } = useToken()
	const { xs } = useResponsive()

	return (
		<>
			<LayoutContent
				{...props}
				style={{
					backgroundColor: token.colorBgContainer,
					display: "flex",
					flexDirection: "column",
					...props?.style,
				}}
			>
				<Flex
					flex={1}
					vertical={true}
					gap={xs ? token.padding : token.paddingLG}
					{...flexProps}
					style={{
						backgroundColor: token.colorBgLayout,
						padding: xs ? token.padding : token.paddingLG,
						borderRadius: token.borderRadiusSM + token.borderRadiusLG,
						...flexProps?.style,
					}}
				>
					{children}
				</Flex>
			</LayoutContent>
		</>
	)
}

export { MainContent }
