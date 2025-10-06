import { css, cx } from "antd-style"
import type { PresetColorKey } from "antd/es/theme/interface"
import { type FC, type ReactNode } from "react"
import { useToken } from "src/shared/hooks"
import { useThemeStore } from "src/shared/store"
import { CardMeta, Tag } from "src/shared/ui"

export interface CardTagMetaProps {
	size?: number
	iconSize?: number
	color?: PresetColorKey
	icon?: ReactNode
	title?: ReactNode
	description?: ReactNode
	hoverable?: boolean
	active?: boolean
	onClick?: () => void
}

const CardTagMeta: FC<CardTagMetaProps> = ({
	size = 45,
	iconSize = 24,
	color,
	icon,
	title,
	description,
	hoverable,
	active,
	onClick,
}) => {
	const { token } = useToken()
	const { isDark } = useThemeStore()

	const metaClassName = cx(css`
		.ant-card-meta-title {
			margin-bottom: 0 !important;
		}
	`)

	const hoverClassName = cx(css`
		border-radius: ${token.borderRadius}px;
		cursor: pointer;
		transition: background-color ${token.motionDurationMid};
		border: 1px solid transparent;

		&:hover {
			color: ${color ? token[color] : "transparent"};
			background-color: ${color
				? isDark
					? token[`${color}6`]
					: token[`${color}1`]
				: "transparent"};
			border-color: ${color ? token[`${color}3`] : "transparent"};

			.card-meta-tag {
				border-color: transparent !important;
			}

			.ant-card-meta-title {
				color: ${color ? (isDark ? token.colorText : token[color]) : "inherit"};
			}
		}
	`)

	const activeClassName = cx(css`
		color: ${color ? token[color] : "transparent"};
		background-color: ${color
			? isDark
				? token[`${color}6`]
				: token[`${color}1`]
			: "transparent"};
		border-color: ${color ? token[`${color}3`] : "transparent"};

		.card-meta-tag {
			border-color: transparent !important;
		}

		.ant-card-meta-title {
			color: ${color ? (isDark ? token.colorText : token[color]) : "inherit"};
		}
	`)

	return (
		<>
			<div onClick={onClick}>
				<CardMeta
					avatar={
						<Tag
							bordered={!active}
							style={{
								height: size,
								width: size,
								fontSize: iconSize,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
							className={"card-meta-tag"}
							color={isDark ? `${color}-inverse` : color}
							icon={icon}
						/>
					}
					className={cx(metaClassName, {
						[hoverClassName]: hoverable,
						[activeClassName]: active,
					})}
					style={{
						alignItems: "center",
					}}
					title={title}
					description={description}
				/>
			</div>
		</>
	)
}

export { CardTagMeta }
