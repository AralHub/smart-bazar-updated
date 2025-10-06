import { UserOutlined } from "@ant-design/icons"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { useResponsive } from "antd-style"
import type { FlexProps } from "antd/es/flex/interface"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Avatar, Flex, Title } from "src/shared/ui"

interface ProfileAvatarImageProps extends Omit<FlexProps, "children"> {
	loading?: boolean
	title?: string
	src?: string
}

const ProfileAvatarImage: FC<ProfileAvatarImageProps> = ({
	loading,
	title,
	src,
	...props
}) => {
	const { token } = useToken()
	const { xs } = useResponsive()

	return (
		<>
			<Flex
				align={"center"}
				gap={8}
				{...props}
			>
				<Avatar
					size={35}
					style={{
						backgroundColor: token.colorPrimaryBg,
					}}
					icon={loading ? <LoadingOutlined spin={true} /> : <UserOutlined />}
					src={
						loading
							? ""
							: src || "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
					}
				/>
				<Title
					level={5}
					hidden={xs}
				>
					{loading ? "..." : title}
				</Title>
			</Flex>
		</>
	)
}

export { ProfileAvatarImage }
