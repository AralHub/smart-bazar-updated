import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import {
	type FormKey,
	type FormParams,
	useFormDevtoolsStore,
} from "src/shared/store"
import { Button, type ButtonProps } from "src/shared/ui"

interface AddButtonProps extends ButtonProps {
	showChildren?: boolean
	formKey?: FormKey
	params: FormParams
	disableForm?: boolean
	buttonType?: "add"
}

const EditButton: FC<AddButtonProps> = ({
	showChildren,
	params,
	formKey,
	children,
	disableForm,
	buttonType,
	...props
}) => {
	const { xs } = useResponsive()
	const { setParams } = useFormDevtoolsStore()

	const onClickAdd = () => {
		if (disableForm) return
		setParams(params, formKey)
	}

	return (
		<>
			<Button
				color={buttonType === "add" ? "default" : "orange"}
				variant={buttonType === "add" ? undefined : "solid"}
				type={buttonType === "add" ? "primary" : "default"}
				icon={buttonType === "add" ? <PlusOutlined /> : <EditOutlined />}
				onClick={onClickAdd}
				{...props}
			>
				{!showChildren || xs ? null : children || "Edit"}
			</Button>
		</>
	)
}

export { EditButton }
