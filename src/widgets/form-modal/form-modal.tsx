import { type FormInstance } from "antd"
import { type FC, useCallback, useEffect } from "react"
import { type FormKey, useFormDevtoolsStore } from "src/shared/store"
import { Modal, type ModalProps } from "src/shared/ui"
import { useShallow } from "zustand/react/shallow"

interface FormModalProps extends ModalProps {
	form: FormInstance
	loading: boolean
	success: boolean
	formKey?: FormKey
	onReset?: () => void
}

const FormModal: FC<FormModalProps> = ({
	form,
	loading,
	success,
	formKey = "main",
	onReset,
	...props
}) => {
	const { open, params, key, reset } = useFormDevtoolsStore(
		useShallow((state) => state)
	)

	const onCloseModal = useCallback(() => {
		form.resetFields()
		reset()
		onReset?.()
	}, [form, onReset, reset])

	useEffect(() => {
		if (!loading && success) {
			onCloseModal()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, success])
	return (
		<>
			<Modal
				open={open && key === formKey}
				title={params ? "Ozgertiw" : "Qosiw"}
				okText={"Saqlaw"}
				onOk={form.submit}
				okButtonProps={{
					loading,
					disabled: loading,
				}}
				onCancel={onCloseModal}
				{...props}
			/>
		</>
	)
}

export { FormModal }
