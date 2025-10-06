import { useLocation, useNavigate, useParams } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import { type FC, useMemo } from "react"
import { useGetMarketsByIdQuery } from "src/services/dashboard/markets"
import { menuData, type MenuItem } from "src/shared/data"
import { useToken } from "src/shared/hooks"
import { useMenuStore } from "src/shared/store"
import { ConfigProvider, Menu } from "src/shared/ui"
import { SidebarContainer } from "./sidebar-container.tsx"
import { SidebarLoading } from "./sidebar-loading.tsx"

const Sidebar: FC = () => {
	const { pathname } = useLocation()
	const { districtId, marketId } = useParams({
		strict: false,
	})
	const {
		data: market,
		isLoading,
		isFetching,
	} = useGetMarketsByIdQuery(marketId)
	const navigate = useNavigate()
	const { collapsed } = useMenuStore()
	const { token } = useToken()
	const { lg } = useResponsive()

	const collapsedLG = useMemo(() => {
		if (!lg) return false

		return collapsed
	}, [collapsed, lg])

	const onSelectMenu = (key: string) => {
		navigate({
			to: key,
		})
	}

	const visibleMenuItems: MenuItem[] = useMemo(() => {
		if (!market?.data) return menuData
		return menuData.filter((item) => {
			const key = item?.key
			const isCattleMarketsNullable =
				Number(market?.data?.cattle_markets_count) === 0
			if (key === "/cattle-market/" && isCattleMarketsNullable) {
				return false
			}
			const isToiletsNullable = Number(market?.data?.restrooms_count) === 0
			if (key === "/restrooms/" && isToiletsNullable) {
				return false
			}
			const isParkingNullable =
				Number(market?.data?.market_car_parks_count) === 0
			if (key === "/parking/" && isParkingNullable) {
				return false
			}
			const isCarMarketsNullable = Number(market?.data?.shoppingCarParks) === 0
			if (key === "/car-market/" && isCarMarketsNullable) {
				return false
			}
			if (
				key === "FaceID" &&
				isCattleMarketsNullable &&
				isCarMarketsNullable &&
				isParkingNullable
			) {
				return false
			}

			return item
		})
	}, [market])

	const fullPathMenuItems: MenuItem[] = useMemo(() => {
		return visibleMenuItems.map((el) => {
			if (el?.type === "group") return el
			return {
				...el,
				key: `/d/${districtId}/m/${marketId}${el?.key}`,
			}
		})
	}, [marketId, districtId, visibleMenuItems])

	const filteredMenuItems: MenuItem[] = useMemo(() => {
		return fullPathMenuItems.filter((item) =>
			collapsedLG ? item?.type !== "group" : item
		)
	}, [fullPathMenuItems, collapsedLG])

	return (
		<>
			<SidebarContainer>
				{isLoading || isFetching ? (
					<SidebarLoading collapsed={collapsedLG} />
				) : (
					<ConfigProvider
						theme={{
							components: {
								Menu: {
									darkItemColor: token.colorText,
									darkItemHoverColor: token.colorPrimary,
									darkItemHoverBg: token.colorBgContainerDisabled,
									darkGroupTitleColor: token.colorText,
									darkItemDisabledColor: token.colorTextTertiary,
									itemHeight: 45,
								},
							},
						}}
					>
						<Menu
							theme={"dark"}
							mode={"inline"}
							style={{
								backgroundColor: "transparent",
								paddingBottom: 48,
							}}
							selectedKeys={[pathname + "/"]}
							onSelect={(item) => onSelectMenu(item.key)}
							inlineCollapsed={collapsedLG}
							items={filteredMenuItems}
						/>
					</ConfigProvider>
				)}
			</SidebarContainer>
		</>
	)
}

export { Sidebar }
