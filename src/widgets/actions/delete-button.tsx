import { DeleteOutlined } from "@ant-design/icons"
import useApp from "antd/es/app/useApp"
import { type FC } from "react"
import { Button, type ButtonProps } from "src/shared/ui"

interface DeleteButtonProps extends ButtonProps {
	confirm: {
		title?: string
		content?: string
		onConfirm: () => void
	}
	hiddenChildren?: boolean
}

const DeleteButton: FC<DeleteButtonProps> = ({
	confirm,
	children,
	hiddenChildren,
	...props
}) => {
	const { modal } = useApp()

	const onConfirmDelete = () => {
		modal.confirm({
			title: confirm?.title || "Bul maǵlıwmatlardı óshiriw?",
			content:
				confirm?.content || "Ishindegi barlıq maǵlıwmatlar da óshiriledi.",
			okText: "Óshiriw",
			cancelText: "Biykarlaw",
			okButtonProps: {
				danger: true,
			},
			centered: true,
			onOk: confirm?.onConfirm,
		})
	}

	return (
		<>
			<Button
				htmlType={"button"}
				type={"primary"}
				onClick={onConfirmDelete}
				danger={true}
				icon={<DeleteOutlined />}
				{...props}
			>
				{hiddenChildren ? null : children || "Delete"}
			</Button>
		</>
	)
}

export { DeleteButton }
