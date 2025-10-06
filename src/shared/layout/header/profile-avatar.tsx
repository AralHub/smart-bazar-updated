import { UserOutlined } from "@ant-design/icons"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { useLocation, useNavigate, useParams } from "@tanstack/react-router"
import { type FC, useEffect } from "react"
import { useGetProfileQuery, useLogoutMutation } from "src/services/auth"
import { useAuth, useToken } from "src/shared/hooks"
import {
	Avatar,
	Button,
	Divider,
	Flex,
	Menu,
	Popover,
	Text,
	Title,
} from "src/shared/ui"
import { formatPhone } from "src/shared/utils"
import { ProfileAvatarImage } from "./profile-avatar-image.tsx"

const ProfileAvatar: FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { data: profile, isLoading, isError } = useGetProfileQuery()
	const { districtId, marketId } = useParams({
		strict: false,
	})
	const { token } = useToken()
	const auth = useAuth()

	const {
		mutate: logout,
		isPending: logoutLoading,
		isSuccess: logoutSuccess,
	} = useLogoutMutation()

	useEffect(() => {
		if (isError || logoutSuccess) {
			auth.logout()
			navigate({
				to: "/login",
				replace: true,
				ignoreBlocker: true,
			})
		}
	}, [logoutSuccess, isError, logout, navigate, auth])
	return (
		<>
			<Popover
				trigger={["click"]}
				styles={{
					root: {
						width: 250,
					},
					body: {
						padding: token.paddingSM,
					},
				}}
				content={
					<Flex
						vertical={true}
						gap={8}
					>
						<Flex gap={8}>
							<Avatar
								size={45}
								style={{
									backgroundColor: token.colorPrimaryBg,
								}}
								icon={
									isLoading ? <LoadingOutlined spin={true} /> : <UserOutlined />
								}
								src={
									isLoading
										? ""
										: "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
								}
							/>
							<Flex vertical={true}>
								<Title level={5}>{profile?.data?.name}</Title>
								<Text type={"secondary"}>
									{profile?.data?.email || formatPhone(profile?.data?.phone)}
								</Text>
							</Flex>
						</Flex>
						<Divider style={{ marginBlock: 4 }} />
						<Menu
							style={{ margin: 0 }}
							onSelect={(item) =>
								navigate({
									to: item.key,
								})
							}
							selectedKeys={[pathname]}
							items={[
								{
									key:
										districtId && marketId
											? `/d/${districtId}/m/${marketId}/profile`
											: "/profile",
									icon: <UserOutlined />,
									label: "Profil",
								},
							]}
						/>
						<Button
							loading={logoutLoading}
							disabled={logoutLoading}
							onClick={() => logout()}
							danger={true}
							block={true}
						>
							Shıǵıw
						</Button>
					</Flex>
				}
			>
				<div>
					<ProfileAvatarImage
						loading={isLoading}
						style={{
							cursor: "pointer",
						}}
						title={profile?.data?.name}
					/>
				</div>
			</Popover>
		</>
	)
}

export { ProfileAvatar }
