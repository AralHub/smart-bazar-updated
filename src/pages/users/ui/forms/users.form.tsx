import type { FC } from "react"
import { PatternFormat } from "react-number-format"
import type { UserChange } from "src/services/auth"
import { useGetMarketsQuery } from "src/services/dashboard/markets"
import { useCreateUsersMutation } from "src/services/dashboard/users"
import {
	Form,
	FormItem,
	Input,
	InputPassword,
	Select,
	useForm,
	type FormProps,
} from "src/shared/ui"
import { formatFormPhone } from "src/shared/utils"
import { FormModal } from "src/widgets/form-modal"

const UsersForm: FC = () => {
	const [form] = useForm<UserChange>()

	const { data: markets, isLoading: marketsLoading } = useGetMarketsQuery({
		page: 1,
		per_page: 1000,
	})

	const {
		mutate: addUser,
		isPending: addLoading,
		isSuccess: addSuccess,
	} = useCreateUsersMutation()

	const onFinish: FormProps<UserChange>["onFinish"] = (values) => {
		if (values?.phone) {
			values.phone = formatFormPhone(values.phone)
		}
		addUser(values)
	}

	return (
		<>
			<FormModal
				form={form}
				loading={addLoading}
				success={addSuccess}
			>
				<Form
					name={"user-form"}
					form={form}
					onFinish={onFinish}
					layout={"vertical"}
					autoComplete={"off"}
					size={"large"}
				>
					<FormItem<UserChange>
						label={"F.A.A"}
						name={"name"}
						rules={[{ required: true }]}
					>
						<Input />
					</FormItem>
					<FormItem<UserChange>
						label={"Telefon nomber"}
						name={"phone"}
						rules={[{ required: true }]}
					>
						<PatternFormat
							allowEmptyFormatting={true}
							mask={"_"}
							customInput={Input}
							format={"+998 ## ### ## ##"}
							placeholder={"+998 90 123 45 67"}
						/>
					</FormItem>
					<FormItem<UserChange>
						label={"Bazar"}
						name={"market_id"}
						rules={[{ required: true }]}
					>
						<Select
							placeholder={"Bazardi saylan"}
							loading={marketsLoading}
							disabled={marketsLoading}
							showSearch={true}
							optionFilterProp={"label"}
							popupMatchSelectWidth={false}
							virtual={false}
							options={markets?.data?.map((el) => ({
								value: el?.id,
								label: el?.name,
							}))}
						/>
					</FormItem>
					<FormItem<UserChange>
						label={"Parol"}
						name={"password"}
						rules={[{ required: true }]}
					>
						<InputPassword placeholder={"*********"} />
					</FormItem>
				</Form>
			</FormModal>
		</>
	)
}

export { UsersForm }
