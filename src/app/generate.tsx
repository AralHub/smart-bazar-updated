/* eslint-disable */
// @ts-nocheck
import { type FC } from "react"
import type { SchemePlace } from "src/services/scheme"
// import dataJson from "src/shared/assets/xojeli-bazar/xojeli-bazar.json"
// import BazarSvg from "src/shared/assets/xojeli-bazar/xojeli-bazar.svg?raw"

const items: string[][] = []
let localItems: string[] = []

const generateSvgMap = (
	color: string,
	svg: string,
	data: {
		data: SchemePlace[]
	}
) => {
	const newSvg = svg
		.split("\r\n")
		.filter((el) => {
			if (el.startsWith("<rect") && el.endsWith('stroke="black" fill="none"/>'))
				return false
			if (el.startsWith("<rect") && el.endsWith('stroke="black" stroke-width="0.5" fill="none"/>'))
				return false
			return true
		})
		.map((el) => {
			if (
				(el.startsWith("<rect") && el.endsWith(`fill="${color}"/>`)) ||
				(el.startsWith("<path") &&
					el.endsWith(`fill="${color}" stroke="black"/>`))
			) {
				localItems.push(el)
			} else if (
				(localItems[0]?.startsWith("<rect") &&
					localItems[0]?.endsWith(`fill="${color}"/>`)) ||
				(localItems[0]?.startsWith("<path") &&
					localItems[0]?.endsWith(`fill="${color}" stroke="black"/>`) &&
					el.startsWith("<text") &&
					el.endsWith("</tspan></text>"))
			) {
				localItems.push(el)
			}
			if (localItems.length === 2) {
				items.push(localItems)
				localItems = []
			}

			return el
		})
		.join("\n")

	// console.log(newSvg.join("\n"))
	// console.log("-----")

	let dataItems = [...data.data.filter((el) => el.place_type_id)]
	const completeItems = items
		.sort((a, b) => {
			const match1 = Number(a[1].match(/<tspan[^>]*>(.*?)<\/tspan>/)?.[1])
			const match2 = Number(b[1].match(/<tspan[^>]*>(.*?)<\/tspan>/)?.[1])
			return match1 - match2
		})
		.map((el) => {
			const matchString = el[1].match(/<tspan[^>]*>(.*?)<\/tspan>/)
			const match = matchString?.[1]

			const idIndex = dataItems?.find(
				(dataItem) => dataItem.name === `${match}`
			)?.id

			dataItems = dataItems.filter(
				(dataItem) => Number(dataItem.id) !== idIndex
			)
			return `<g name="${idIndex || 0}">\n${el.join("\n")}\n</g>`
		})
		.sort((a, b) => {
			const match1 = a.match(/<g[^>]*name="(\d+)"[^>]*>/)
			const match2 = b.match(/<g[^>]*name="(\d+)"[^>]*>/)
			return Number(match1?.[1]) - Number(match2?.[1])
		})
	console.log(completeItems.join("\n"))
}

const Generate: FC = () => {
	// const color = "#C7E446"
	//
	// generateSvgMap(color, BazarSvg, dataJson)

	// //  eslint-disable-next-line @typescript-eslint/no-explicit-any
	// generateSvgTags(data.data.filter((el) => el.place_type_id === 2) as any)
	return null
}

export { Generate }
