import type { TagProps } from "antd"
import { type FC, useMemo } from "react"
import { useThemeStore } from "src/shared/store"
import { Tag } from "src/shared/ui"

interface TagIconProps extends TagProps {
	size?: "small"
}

const TagIcon: FC<TagIconProps> = ({ color, icon, style, size, ...props }) => {
	const isDark = useThemeStore((state) => state.isDark)

	const themeColor = useMemo(() => {
		if (!isDark) return color
		return `${color}-inverse`
	}, [color, isDark])
	return (
		<>
			<Tag
				bordered={false}
				color={themeColor}
				style={{
					padding: size === "small" ? 8 : 12,
					fontSize: size === "small" ? 18 : 24,
					...style,
				}}
				icon={icon}
				{...props}
			/>
		</>
	)
}

export { TagIcon }
