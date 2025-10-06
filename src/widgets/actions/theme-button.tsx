import { MoonOutlined, SunOutlined } from "@ant-design/icons"
import type { ButtonProps } from "antd"
import { type FC, useTransition } from "react"
import { useThemeStore } from "src/shared/store"
import { Button } from "src/shared/ui"

const ThemeButton: FC<ButtonProps> = (props) => {
	const [isLoading, startTransition] = useTransition()
	const { isDark, toggleDark } = useThemeStore()

	return (
		<>
			<Button
				size={"large"}
				shape={"circle"}
				loading={isLoading}
				onClick={() => {
					startTransition(() => {
						toggleDark()
					})
				}}
				icon={isDark ? <SunOutlined /> : <MoonOutlined />}
				type={"text"}
				{...props}
			/>
		</>
	)
}

export { ThemeButton }
