import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import type { SchemePlace } from "src/services/scheme"
import type { ExcelData } from "src/widgets/actions"

export const generateLegends = (selected: Record<string, unknown>) => {
	return Object.entries(selected)
		.filter(([, value]) => value)
		.map((el) => el[0])
}

export const getToday = (format: string = "YYYY-MM-DD") =>
	dayjs().format(format)

export const generateSvgTags = (data: SchemePlace[]) => {
	// eslint-disable-next-line no-console
	console.log(
		"<!-- Rent Dukan - Start -->\n",
		data
			?.filter((el) => el.is_rent && el.place_type_id === 1)
			.map((el) => `<g name="${el.id}">${el.name}</g>`)
			.join("\n"),
		"\n<!-- Rent Dukan - End -->\n",
		"\n<!-- Rent Rasta - Start -->\n",
		data
			?.filter((el) => el.is_rent && el.place_type_id === 2)
			.map((el) => `<g name="${el.id}">${el.name}</g>`)
			.join("\n"),
		"\n<!-- Rent Rasta - End -->\n",
		"\n<!-- Dukan - Start -->\n",
		data
			?.filter((el) => !el.is_rent && el.place_type_id === 1)
			.map((el) => `<g name="${el.id}">${el.name}</g>`)
			.join("\n"),
		"\n<!-- Dukan - End -->\n",
		"\n<!-- Rasta - Start -->\n",
		data
			?.filter((el) => !el.is_rent && el.place_type_id === 2)
			.map((el) => `<g name="${el.id}">${el.name}</g>`)
			.join("\n"),
		"\n<!-- Rasta - End -->"
	)
}

export const generateExcelHeaders = <T>(columns: ColumnsType<T>) => {
	const headers: (string | null)[][] = []
	const upperColumns = columns.flatMap((column) => {
		const title = typeof column.title === "function" ? null : column.title
		const childrenLength = "children" in column ? column?.children?.length : 0
		const result = [title?.toString() || null]
		if (childrenLength > 1) {
			Array.from({ length: childrenLength - 1 }).forEach(() =>
				result.push(null)
			)
		}
		return result
	})
	headers.push(upperColumns)
	const lowerColumns = columns.flatMap((column) => {
		const result: (string | null)[] = []
		if ("children" in column) {
			const childResult = column.children.map((col) => {
				const title = typeof col.title === "function" ? null : col.title
				return title?.toString() || null
			})
			result.push(...childResult)
		} else {
			result.push(null)
		}
		return result
	})
	if (lowerColumns.length && !lowerColumns.every((el) => el === null)) {
		headers.push(lowerColumns)
	}
	return headers
}

const cellBorder = {
	top: {
		style: "thin",
		color: {
			argb: "000000",
		},
	},
	left: {
		style: "thin",
		color: {
			argb: "000000",
		},
	},
	right: {
		style: "thin",
		color: {
			argb: "000000",
		},
	},
	bottom: {
		style: "thin",
		color: {
			argb: "000000",
		},
	},
} as const

export function generateExcelColumns(n: number): string[] {
	const result: string[] = []
	let i = 0

	while (result.length < n) {
		let s = ""
		let q = i
		while (q >= 0) {
			s = String.fromCharCode((q % 26) + 65) + s
			q = Math.floor(q / 26) - 1
		}
		result.push(s)
		i++
	}

	return result
}

export const generateExcel = async (
	data: ExcelData,
	name: string = "excel"
) => {
	const { headers, values, totals, merges, lastNoTotal } = data

	const alphabets = generateExcelColumns(values?.[0]?.length || 26)

	const workbook = new ExcelJS.Workbook()
	const worksheet = workbook.addWorksheet(name)

	// Добавляем заголовки
	headers.forEach((headerRow) => {
		worksheet.addRow(headerRow)
	})

	values.forEach((row) => {
		worksheet.addRow(row)
	})

	// values.forEach((row, rowIndex) => {
	// 	row.forEach((col, colIndex) => {
	// 		if (!(typeof col === "string")) return
	// 		if (!col?.startsWith("http")) return
	// 		console.log(col)
	// 		api
	// 			.get(col, {
	// 				responseType: "arraybuffer",
	// 			})
	// 			.then((response) => {
	// 				console.log(response)
	// 				// response.arrayBuffer().then((arrayBuffer) => {
	// 				// 	const buffer = new Uint8Array(arrayBuffer)
	// 				//
	// 				// 	const imageId = worksheet.workbook.addImage({
	// 				// 		buffer: buffer,
	// 				// 		extension: "jpeg",
	// 				// 	})
	// 				//
	// 				// 	worksheet.addImage(imageId, {
	// 				// 		tl: { col: colIndex, row: rowIndex },
	// 				// 		ext: { width: 90, height: 50 },
	// 				// 	})
	// 				// })
	// 			})
	// 	})
	// })

	totals.forEach((row) => {
		worksheet.addRow(row)
	})

	// Объединяем ячейки
	merges.forEach((merge) => {
		worksheet.mergeCells(merge)
	})

	// Применяем стили к заголовкам
	const valuesDataCells = [...headers, ...values, ...totals].map(
		(value, index) =>
			value.map((_v, childIndex) => `${alphabets[childIndex]}${index + 1}`)
	)

	valuesDataCells.forEach((valueDataCells) =>
		valueDataCells.map((cellAddress) => {
			const cell = worksheet.getCell(cellAddress)
			cell.border = cellBorder
			cell.alignment = {
				horizontal: "center",
				vertical: "middle",
			}
			cell.font = {
				name: "Times New Roman",
			}
		})
	)

	const headerCells = headers.map((value, index) =>
		value.map((_v, childIndex) => `${alphabets[childIndex]}${index + 1}`)
	)

	headerCells.forEach((header) =>
		header.forEach((cellAddress) => {
			const cell = worksheet.getCell(cellAddress)
			cell.font = {
				...cell.font,
				bold: true,
				color: {
					argb: "002060",
				},
			}
			cell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "D9E1F2" },
			}
		})
	)

	const labelCells = values.map((_, index) => `A${headers.length + index + 1}`)

	labelCells.forEach((cellAddress) => {
		const cell = worksheet.getCell(cellAddress)
		cell.font = {
			...cell.font,
			bold: true,
		}
		cell.alignment = {
			...cell.alignment,
			horizontal: "left",
		}
	})

	const totalCells = lastNoTotal
		? []
		: values.map(
				(_, index) =>
					`${alphabets[values[0].length - 1]}${headers.length + index + 1}`
			)

	const totalAmountCells = totals.flatMap((total, index) =>
		total.map(
			(_, childIndex) =>
				`${alphabets[childIndex]}${headers.length + values.length + 1 + index}`
		)
	)

	const totalMergedCells = [...totalAmountCells, ...totalCells]

	totalMergedCells.forEach((cellAddress) => {
		const cell = worksheet.getCell(cellAddress)
		cell.font = {
			...cell.font,
			bold: true,
			color: {
				argb: "002060",
			},
		}
		cell.fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "D9E1F2" },
		}
	})

	// Автоширина колонок с учетом содержимого
	worksheet?.columns?.forEach((column) => {
		let maxWidth = 8 // минимальная ширина
		if (!column?.eachCell) return
		column.eachCell({ includeEmpty: true }, (cell) => {
			if (cell.value !== null && cell.value !== undefined) {
				const text = cell.value.toString()
				const isBold = cell.font?.bold || false

				// Учитываем жирный шрифт (он шире)
				let cellWidth = text.length
				if (isBold) {
					cellWidth = Math.ceil(cellWidth * 1.2)
				}

				// Для кириллицы добавляем небольшой коэффициент
				const hasCyrillic = /[а-яё]/i.test(text)
				if (hasCyrillic) {
					cellWidth = Math.ceil(cellWidth * 1.1)
				}

				if (cellWidth > maxWidth) {
					maxWidth = cellWidth
				}
			}
		})

		// Устанавливаем ширину с отступами, но ограничиваем максимум
		column.width = Math.min(Math.max(maxWidth + 1, 8), 30)
	})

	worksheet?.eachRow((row, rowIndex) => {
		if (
			headers.map((_v, index) => index + 1).includes(rowIndex) ||
			rowIndex === worksheet.rowCount
		) {
			row.height = 30
			return
		}
		row.height = 20
	})

	// Генерируем файл и скачиваем
	// Скачивание с file-saver
	const buffer = await workbook.xlsx.writeBuffer()
	const blob = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	})

	saveAs(blob, `${name}_${Date.now()}.xlsx`)
}
