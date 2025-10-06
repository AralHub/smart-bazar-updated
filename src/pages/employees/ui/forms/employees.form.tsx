import { useParams } from "@tanstack/react-router"
import { type FC, useEffect } from "react"
import { PatternFormat } from "react-number-format"
import {
	type Employee,
	type EmployeeChange,
	useCreateEmployeesMutation,
	useEditEmployeesMutation,
} from "src/services/dashboard/employees"
import { useGetPositionsQuery } from "src/services/dashboard/employees/positions"
import { useFormDevtoolsStore } from "src/shared/store"
import {
	Form,
	FormItem,
	type FormProps,
	Input,
	Select,
	useForm,
} from "src/shared/ui"
import { formatFormPhone, formatPhone } from "src/shared/utils"
import { FormModal } from "src/widgets/form-modal"

const EmployeesForm: FC = () => {
	const [form] = useForm<EmployeeChange>()
	const { marketId } = useParams({
		from: "/_layout/d/$districtId/m/$marketId/_admin-layout/employees",
	})

	const params = useFormDevtoolsStore((state) => state.getParams<Employee>())

	const { data: position, isLoading } = useGetPositionsQuery()

	const {
		mutate: addEmployee,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreateEmployeesMutation()

	const {
		mutate: editEmployee,
		isPending: editLoading,
		isSuccess: editSuccess,
	} = useEditEmployeesMutation()

	const onFinish: FormProps<EmployeeChange>["onFinish"] = (values) => {
		if (values.phone) {
			values.phone = formatFormPhone(values.phone)
		}
		if (params) {
			editEmployee({
				...values,
				id: params?.id,
			})
			return
		}
		addEmployee({
			...values,
			market_id: marketId,
		})
	}

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				...params,
				phone: formatPhone(params?.phone),
			})
		}
	}, [form, params])
	return (
		<>
			<FormModal
				form={form}
				loading={addLoading || editLoading}
				success={addSuccess || editSuccess}
			>
				<Form
					layout={"vertical"}
					name={"worker-form"}
					form={form}
					size={"large"}
					onFinish={onFinish}
				>
					<FormItem<EmployeeChange>
						label={"FIO"}
						name={"name"}
						rules={[{ required: true }]}
					>
						<Input />
					</FormItem>
					<FormItem<EmployeeChange>
						label={"Telefon"}
						name={"phone"}
						rules={[{ required: true }]}
					>
						<PatternFormat
							customInput={Input}
							format={"+998 ## ### ## ##"}
							placeholder={"+998 90 123 45 67"}
						/>
					</FormItem>
					<FormItem<EmployeeChange>
						label={"Lawazim"}
						name={"position_id"}
						rules={[{ required: true }]}
					>
						<Select
							loading={isLoading}
							disabled={isLoading}
							options={position?.data?.map((el) => ({
								value: el?.id,
								label: el?.name,
							}))}
							showSearch={true}
							optionFilterProp={"label"}
							virtual={false}
							placeholder={"Lawazim saylan"}
						/>
					</FormItem>
				</Form>
			</FormModal>
		</>
	)
}

export { EmployeesForm }
