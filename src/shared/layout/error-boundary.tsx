import {
	ArrowLeftOutlined,
	LoginOutlined,
	SyncOutlined,
} from "@ant-design/icons"
import {
	useQueryClient,
	useQueryErrorResetBoundary,
} from "@tanstack/react-query"
import {
	ErrorComponent,
	type ErrorComponentProps,
	useRouter,
} from "@tanstack/react-router"
import { type FC, useEffect } from "react"
import type { ResponseError } from "src/services/shared"
import { useAuth } from "src/shared/hooks"
import { Button, Flex, Result, Space } from "src/shared/ui"

const ErrorBoundary: FC<ErrorComponentProps> = ({ error }) => {
	const queryErrorResetBoundary = useQueryErrorResetBoundary()
	const queryClient = useQueryClient()
	const router = useRouter()
	const auth = useAuth()
	const responseError = error as ResponseError

	useEffect(() => {
		queryErrorResetBoundary.reset()
		if (responseError?.status === 401) {
			auth.logout()
			queryClient.removeQueries()
			router.navigate({
				to: "/login",
				replace: true,
			})
		}
	}, [
		auth,
		queryClient,
		queryErrorResetBoundary,
		responseError?.status,
		router,
	])
	return (
		<>
			<Flex
				flex={1}
				style={{ width: "100%" }}
				justify={"center"}
				align={"center"}
			>
				<Result
					status={responseError?.status === 401 ? "403" : "500"}
					title={responseError?.status === 401 ? "401" : "500"}
					subTitle={
						responseError?.status === 401
							? "Siz avtorizatsiyadan ótpedińiz"
							: "Kútilmegen qáte júz berdi."
					}
					children={<ErrorComponent error={error} />}
					extra={
						<Space>
							<Button
								type={"primary"}
								onClick={() => router.history.back()}
								icon={<ArrowLeftOutlined />}
							>
								Artqa
							</Button>
							{responseError?.status === 401 ? (
								<Button
									type={"primary"}
									onClick={() =>
										router.navigate({ to: "/login", replace: true })
									}
									icon={<LoginOutlined />}
								>
									Avtorizciyalanıw
								</Button>
							) : (
								<Button
									type={"primary"}
									onClick={() => router.invalidate()}
									icon={<SyncOutlined />}
								>
									Qayta júklew
								</Button>
							)}
						</Space>
					}
				/>
			</Flex>
		</>
	)
}

export { ErrorBoundary }
