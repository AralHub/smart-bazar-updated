import type { AnyObject } from "antd/es/_util/type"
import type { ColumnsType, TableProps as AntdTableProps } from "antd/es/table"
import AntdTable from "antd/es/table/Table"
import type { ReactNode } from "react"
import { useToken } from "src/shared/hooks"
import { Flex, Space, Title } from "./"

export interface TableProps<T extends AnyObject>
	extends Omit<AntdTableProps<T>, "title"> {
	title?: ReactNode
	extra?: ReactNode
	subExtra?: ReactNode
}

const Table = <T extends AnyObject>({
	title,
	extra,
	subExtra,
	style,
	pagination,
	scroll,
	...props
}: TableProps<T>) => {
	const { token } = useToken()
	return (
		<AntdTable
			title={
				title || extra || subExtra
					? () => (
							<Flex
								vertical={true}
								gap={4}
							>
								<Flex
									align={"start"}
									gap={4}
									wrap={true}
									justify={"space-between"}
								>
									{title && typeof title === "string" ? (
										<Title level={4}>{title}</Title>
									) : (
										<Space>{title}</Space>
									)}
									{extra && <Space>{extra}</Space>}
								</Flex>
								{subExtra}
							</Flex>
						)
					: undefined
			}
			style={{
				borderRadius: token.borderRadius,
				...style,
			}}
			onRow={() => ({
				style: {
					cursor: "pointer",
				},
			})}
			scroll={
				scroll && scroll?.scrollToFirstRowOnChange
					? scroll
					: {
							x: "auto",
							...scroll,
						}
			}
			pagination={
				pagination !== false
					? {
							...pagination,
							style: {
								margin: 0,
								padding: token.padding,
								backgroundColor: token.colorBgContainer,
								borderRadius: `0 0 ${token.borderRadius}px ${token.borderRadius}px`,
								...pagination?.style,
							},
						}
					: pagination
			}
			{...props}
		/>
	)
}

export type { ColumnsType }
export default Table
