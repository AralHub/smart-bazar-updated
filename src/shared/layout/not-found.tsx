import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { type FC } from "react"
import { Button, Flex, Result, Space } from "src/shared/ui"

const NotFound: FC = () => {
	const router = useRouter()

	return (
		<>
			<Flex justify={"center"} align={"center"}>
				<Result
					status={"404"}
					title={"404"}
					subTitle={"Страница не найдена"}
					extra={
						<Space>
							<Button
								type={"primary"}
								icon={<ArrowLeftOutlined />}
								onClick={() => router.history.back()}
							>
								Назад
							</Button>
							<Button
								type={"link"}
								icon={<HomeOutlined />}
								onClick={() => router.history.replace("/")}
							>
								Главная
							</Button>
						</Space>
					}
				/>
			</Flex>
		</>
	)
}

export { NotFound }
