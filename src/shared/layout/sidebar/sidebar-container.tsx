import { Drawer } from "antd"
import { useResponsive } from "antd-style"
import { type FC, type PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"
import { useMenuStore } from "src/shared/store"
import { Flex, Sider } from "src/shared/ui"
import { Logo } from "src/widgets/logo"

const SidebarContainer: FC<PropsWithChildren> = ({ children }) => {
	const { lg } = useResponsive()
	const { collapsed, setCollapsed, toggleCollapsed } = useMenuStore()
	const { token } = useToken()

	if (!lg)
		return (
			<Drawer
				open={collapsed}
				onClose={() => toggleCollapsed()}
				placement={"left"}
				closable={false}
				styles={{
					body: {
						padding: 0,
					},
				}}
				width={270}
			>
				<Flex
					align={"center"}
					style={{
						padding: "8px 24px",
						minHeight: 64,
					}}
				>
					<Logo />
				</Flex>
				{children}
			</Drawer>
		)

	return (
		<>
			<Sider
				theme={"light"}
				collapsed={collapsed}
				onCollapse={(collapsed) => {
					if (!lg) return
					setCollapsed(collapsed)
				}}
				breakpoint={"xl"}
				width={270}
				collapsedWidth={85}
				style={{
					paddingInline: collapsed ? token.paddingSM : token.padding,
					paddingTop: token.paddingSM,
					position: "sticky",
					top: 64,
					left: 0,
					bottom: 0,
					height: "calc(100vh - 64px)",
					overflowX: "hidden",
					overflowY: "auto",
					zIndex: 10,
				}}
			>
				{children}
			</Sider>
		</>
	)
}

export { SidebarContainer }
