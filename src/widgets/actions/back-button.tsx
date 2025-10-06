import { ArrowLeftOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { type FC } from "react"
import { Button, type ButtonProps } from "src/shared/ui"

interface BackButtonProps extends ButtonProps {
	hiddenChildren?: boolean
}

const BackButton: FC<BackButtonProps> = ({ hiddenChildren }) => {
	const router = useRouter()

	return (
		<>
			<Button
				icon={<ArrowLeftOutlined />}
				type={"primary"}
				onClick={() => router.history.back()}
			>
				{hiddenChildren ? null : "Artqa"}
			</Button>
		</>
	)
}

export { BackButton }
