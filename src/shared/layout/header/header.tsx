import { MenuOutlined } from "@ant-design/icons"
import { Link, useParams } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useAuth, useToken } from "src/shared/hooks"
import { SelectRegionMarket } from "src/shared/layout/header/select-region-market.tsx"
import { useMenuStore } from "src/shared/store"
import { Button, Flex, LayoutHeader, Space } from "src/shared/ui"
import { Logo } from "src/widgets/logo"
import { ProfileAvatarImage } from "./profile-avatar-image.tsx"
import { ProfileAvatar } from "./profile-avatar.tsx"
import { ThemeButton } from "src/widgets/actions"

interface HeaderProps {
	isHome?: boolean
	isGuest?: boolean
}

const Header: FC<HeaderProps> = ({ isHome, isGuest }) => {
	const { toggleCollapsed } = useMenuStore()
	const { districtId, marketId } = useParams({
		strict: false,
	})
	const { token } = useToken()
	const { role } = useAuth()
	const { xs, lg = true } = useResponsive()

	const logo = <Logo collapsed={xs || (!lg && !isGuest && !isHome)} />

	return (
		<>
			<LayoutHeader
				style={{
					backgroundColor: token.colorBgContainer,
					padding: 0,
					display: "flex",
					position: "sticky",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 10,
				}}
			>
				<Flex
					hidden={!lg && !isGuest && !isHome}
					style={{
						paddingInline: token.paddingLG,
						width: 270,
						paddingRight: token.paddingLG,
					}}
				>
					{isGuest ? (
						logo
					) : (
						<Link
							to={role === 2 ? "/d/$districtId/m/$marketId/dashboard" : "/"}
							params={{ districtId, marketId }}
						>
							{logo}
						</Link>
					)}
				</Flex>
				{isGuest ? (
					<ProfileAvatarImage
						style={{ marginLeft: "auto", paddingRight: token.paddingLG }}
						src={"https://api.dicebear.com/7.x/miniavs/svg?seed=2"}
						title={"Satiwshi"}
					/>
				) : (
					<Flex
						flex={1}
						align={"center"}
						gap={4}
						justify={"space-between"}
						style={{
							width: "100%",
							paddingInline: lg ? token.paddingLG : token.padding,
						}}
					>
						<Flex
							gap={8}
							align={"center"}
						>
							{isHome ? (
								<div></div>
							) : (
								<>
									<Button
										size={"large"}
										shape={"circle"}
										onClick={() => toggleCollapsed()}
										icon={<MenuOutlined />}
										type={"text"}
									/>
									<SelectRegionMarket />
								</>
							)}
						</Flex>
						<Space style={{ justifySelf: "end" }}>
							<ThemeButton />
							<ProfileAvatar />
						</Space>
					</Flex>
				)}
			</LayoutHeader>
		</>
	)
}

export { Header }
