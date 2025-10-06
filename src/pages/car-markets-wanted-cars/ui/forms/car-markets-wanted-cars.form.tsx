import { type FC, useEffect } from "react"
import {
	type CarWanted,
	type CarWantedChange,
	useCreateCarsWantedMutation,
	useEditCarsWantedMutation,
} from "src/services/dashboard/cars"
import { useFormDevtoolsStore } from "src/shared/store"
import { Form, FormItem, type FormProps, Input, useForm } from "src/shared/ui"
import { FormModal } from "src/widgets/form-modal"

const CarMarketsWantedCarsForm: FC = () => {
	const [form] = useForm<CarWantedChange>()

	const params = useFormDevtoolsStore((state) => state.getParams<CarWanted>())

	const {
		mutate: addCarWanted,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreateCarsWantedMutation()

	const {
		mutate: editCarWanted,
		isPending: editLoading,
		isSuccess: editSuccess,
	} = useEditCarsWantedMutation()

	const onFinish: FormProps<CarWantedChange>["onFinish"] = (values) => {
		if (params) {
			editCarWanted({
				...values,
				id: params?.id,
			})
			return
		}
		addCarWanted(values)
	}

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				...params,
			})
		}
	}, [form, params])
	return (
		<>
			<FormModal
				formKey={"primary"}
				form={form}
				loading={addLoading || editLoading}
				success={addSuccess || editSuccess}
			>
				<Form
					form={form}
					onFinish={onFinish}
					name={"car-wanted-form"}
					layout={"vertical"}
					autoComplete={"off"}
					size={"large"}
				>
					<FormItem
						label={"Mashin nomeri"}
						name={"number"}
						normalize={(value?: string) =>
							value?.toUpperCase()?.replace(/\s+/g, "")
						}
						rules={[{ required: true }]}
					>
						<Input placeholder={"Mashin nomerin kiritin"} />
					</FormItem>
				</Form>
			</FormModal>
		</>
	)
}

export { CarMarketsWantedCarsForm }
