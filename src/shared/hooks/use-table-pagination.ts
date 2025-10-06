import { useState } from "react"

interface TablePaginationProps {
	current?: number
	pageSize?: number
}

export const useTablePagination = ({
	current = 1,
	pageSize = 10,
}: TablePaginationProps) => {
	const [params, setParams] = useState({
		current,
		pageSize,
	})

	const onChange = (current: number, pageSize: number) =>
		setParams({ current, pageSize })

	return {
		current: params.current,
		pageSize: params.pageSize,
		onChange,
	}
}
