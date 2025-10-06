import { PlusOutlined } from "@ant-design/icons"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { type FormKey, useFormDevtoolsStore } from "src/shared/store"
import { Button, type ButtonProps } from "src/shared/ui"

interface AddButtonProps extends ButtonProps {
	showChildren?: boolean
	formKey?: FormKey
	disableForm?: boolean
}

const AddButton: FC<AddButtonProps> = ({
	showChildren,
	formKey,
	children,
	disableForm,
	...props
}) => {
	const { xs } = useResponsive()
	const { toggleOpen } = useFormDevtoolsStore()

	const onClickAdd = () => {
		if (disableForm) return
		toggleOpen(formKey)
	}

	return (
		<>
			<Button
				type={"primary"}
				icon={<PlusOutlined />}
				onClick={(e) => {
					e.stopPropagation()
					onClickAdd()
				}}
				{...props}
			>
				{!showChildren || xs ? null : children || "Qosiw"}
			</Button>
		</>
	)
}

export { AddButton }
