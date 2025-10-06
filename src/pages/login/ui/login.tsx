import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { MainContent } from "src/shared/layout"
import { useThemeStore } from "src/shared/store"
import { Card, Flex, Layout, Text } from "src/shared/ui"
import { ThemeButton } from "src/widgets/actions"
import { Logo } from "src/widgets/logo"
import { LoginForm } from "./forms"

const color1 = "rgba(238, 119, 82, 0.2)"
const color2 = "rgba(231, 60, 126, 0.2)"
const color3 = "rgba(35, 166, 213, 0.2)"
const color4 = "rgba(35, 213, 171, 0.2)"

const Login: FC = () => {
	const { token } = useToken()
	const { isDark } = useThemeStore()
	
	return (
		<section style={{
			backgroundColor: isDark ? "#000" : "#fff",
		}}>
			<Layout
				style={{
					minHeight: "100vh",
					background:
						`linear-gradient(45deg, ${color1}, ${color2}, ${color3}, ${color4}) 0% 0% / 400% 400%`,
					animation: "15s infinite gradient",
					position: "relative",
				}}
			>
				<ThemeButton style={{
					position: "absolute",
					top: 16,
					right: 16
				}} />
				<MainContent
					style={{
						backgroundColor: "transparent",
					}}
					flexProps={{
						justify: "center",
						align: "center",
						style: {
							backgroundColor: "transparent",
							padding: "72px 16px 16px",
						},
					}}
				>
					<Card
						style={{
							maxWidth: 384,
							width: "100%",
						}}
					>
						<Flex
							vertical={true}
							style={{ width: "100%" }}
							gap={8}
						>
							<Logo
								style={{
									margin: "0 auto",
								}}
							/>
							<Text
								style={{
									textAlign: "center",
									marginBlock: token.marginSM,
								}}
							>
								Smart Bazar ga kiriw
							</Text>
							<LoginForm />
						</Flex>
					</Card>
				</MainContent>
			</Layout>
		</section>
	)
}

export { Login }
