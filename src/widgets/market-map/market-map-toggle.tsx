import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Checkbox, ConfigProvider, Space } from "src/shared/ui"

interface MarketMapToggleProps {
	value: {
		isBlock: boolean
		isInfra: boolean
		isRasta: boolean
	}
	onChange: (value: {
		isBlock: boolean
		isInfra: boolean
		isRasta: boolean
	}) => void
}

const MarketMapToggle: FC<MarketMapToggleProps> = ({ value, onChange }) => {
	const { token } = useToken()

	return (
		<>
			<Space
				wrap={true}
				style={{
					position: "absolute",
					backgroundColor: token.colorBgContainer,
					padding: token.paddingXS,
					borderRadius: token.borderRadiusSM,
					boxShadow: token.boxShadowTertiary,
					zIndex: 9,
					top: 24,
					left: 24,
				}}
			>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: token.green,
						},
					}}
				>
					<Checkbox
						checked={value.isInfra}
						onChange={(e) => {
							onChange({
								...value,
								isInfra: e.target.checked,
							})
						}}
					>
						Dukanlar
					</Checkbox>
				</ConfigProvider>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: token.yellow,
						},
					}}
				>
					<Checkbox
						checked={value.isRasta}
						onChange={(e) => {
							onChange({
								...value,
								isRasta: e.target.checked,
							})
						}}
					>
						Rastalar
					</Checkbox>
				</ConfigProvider>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: token.cyan,
						},
					}}
				>
					<Checkbox
						checked={value.isBlock}
						onChange={(e) => {
							onChange({
								...value,
								isBlock: e.target.checked,
							})
						}}
					>
						Jaymalar
					</Checkbox>
				</ConfigProvider>
			</Space>
		</>
	)
}

export { MarketMapToggle }
