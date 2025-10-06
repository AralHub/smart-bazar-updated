import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { useThemeStore } from "src/shared/store"
import { Image, Space, type SpaceProps, Title } from "src/shared/ui"

interface LogoProps extends SpaceProps {
	collapsed?: boolean
}

const Logo: FC<LogoProps> = ({ collapsed, style, ...props }) => {
	const { token } = useToken()
	const isDark = useThemeStore((state) => state.isDark)

	return (
		<Space
			style={{ overflow: "hidden", ...style }}
			{...props}
		>
			<Image
				preview={false}
				src={"/logo.png"}
				width={32}
				height={32}
				style={{ backgroundColor: "transparent" }}
				fallback={"/public/logo.png"}
				alt={"Logo"}
			/>
			{collapsed ? null : (
				<Title
					level={3}
					style={{
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						overflowX: "hidden",
						color: isDark ? token.colorText : token.colorPrimary,
					}}
				>
					Smart Bazar
				</Title>
			)}
		</Space>
	)
}

export { Logo }
