import { MapSvg } from "src/shared/assets"
import { MAP_NAMES } from "src/shared/constants"

export type MarketsMapsData = {
	title: string
	districtId: number
	marketId: number
	name: MAP_NAMES
	svg?: boolean
	items?: (Omit<MarketsMapsData, "items" | "districtId" | "marketId"> & {
		id: number
	})[]
}

export const marketsMapsData: MarketsMapsData[] = [
	{
		districtId: 1,
		marketId: 1,
		title: "Nókis",
		name: MAP_NAMES.NOKIS,
		svg: !!MapSvg[MAP_NAMES.NOKIS],
		items: [
			{
				id: 1,
				title: "Block - 1",
				name: MAP_NAMES.NOKIS_1_BLOCK,
				svg: !!MapSvg[MAP_NAMES.NOKIS_1_BLOCK],
			},
			{
				id: 2,
				title: "Block - 2",
				name: MAP_NAMES.NOKIS_2_BLOCK,
				svg: !!MapSvg[MAP_NAMES.NOKIS_2_BLOCK],
			},
			{
				id: 3,
				title: "Block - 3",
				name: MAP_NAMES.NOKIS_3_BLOCK,
				svg: !!MapSvg[MAP_NAMES.NOKIS_3_BLOCK],
			},
			{
				id: 4,
				title: "Block - 4",
				name: MAP_NAMES.NOKIS_4_BLOCK,
				svg: !!MapSvg[MAP_NAMES.NOKIS_4_BLOCK],
			},
			{
				id: 5,
				title: "Block - 5",
				name: MAP_NAMES.NOKIS_5_BLOCK,
				svg: !!MapSvg[MAP_NAMES.NOKIS_5_BLOCK],
			},
			{
				id: 6,
				title: "Block - 6",
				name: MAP_NAMES.NOKIS_6_BLOCK,
				svg: !!MapSvg[MAP_NAMES.NOKIS_6_BLOCK],
			},
			{
				id: 7,
				title: "Jayma filiallar",
				name: MAP_NAMES.NOKIS_JAYMA_FILIAL,
				svg: !!MapSvg[MAP_NAMES.NOKIS_JAYMA_FILIAL],
			},
			{
				id: 8,
				title: "Taza Kritiy",
				name: MAP_NAMES.NOKIS_TAZA_KRITIY,
				svg: !!MapSvg[MAP_NAMES.NOKIS_TAZA_KRITIY],
			},
			{
				id: 9,
				title: "Gone Kritiy - 1 qabat",
				name: MAP_NAMES.NOKIS_GONE_KRITIY_1,
				svg: !!MapSvg[MAP_NAMES.NOKIS_GONE_KRITIY_1],
			},
			{
				id: 10,
				title: "Gone Kritiy - 2 qabat",
				name: MAP_NAMES.NOKIS_GONE_KRITIY_2,
				svg: !!MapSvg[MAP_NAMES.NOKIS_GONE_KRITIY_2],
			},
		],
	},
	{
		districtId: 2,
		marketId: 21,
		title: "Xojeli",
		name: MAP_NAMES.XOJELI,
		svg: !!MapSvg[MAP_NAMES.XOJELI],
	},
	{
		districtId: 3,
		marketId: 3,
		title: "Taqıyatas",
		name: MAP_NAMES.TAQIYATAS,
		svg: !!MapSvg[MAP_NAMES.TAQIYATAS],
	},
	{
		districtId: 4,
		marketId: 4,
		title: "Nókis rayonı",
		name: MAP_NAMES.NOKIS_RAYON,
		svg: !!MapSvg[MAP_NAMES.NOKIS_RAYON],
	},
	{
		districtId: 5,
		marketId: 5,
		title: "Kegeyli",
		name: MAP_NAMES.KEGEYLI,
		svg: !!MapSvg[MAP_NAMES.KEGEYLI],
	},
	{
		districtId: 5,
		marketId: 19,
		title: "Xalqabad",
		name: MAP_NAMES.XALQABAD,
		svg: !!MapSvg[MAP_NAMES.XALQABAD],
	},
	{
		districtId: 6,
		marketId: 6,
		title: "Bozataw",
		name: MAP_NAMES.BOZATAW,
		svg: !!MapSvg[MAP_NAMES.BOZATAW],
	},
	{
		districtId: 7,
		marketId: 7,
		title: "Qaraózek",
		name: MAP_NAMES.QARAOZEK,
		svg: !!MapSvg[MAP_NAMES.QARAOZEK],
	},
	{
		districtId: 8,
		marketId: 8,
		title: "Taxtakópir",
		name: MAP_NAMES.TAXTAKOPIR,
		svg: !!MapSvg[MAP_NAMES.TAXTAKOPIR],
	},
	{
		districtId: 9,
		marketId: 9,
		title: "Shımbay",
		name: MAP_NAMES.SHIMBAY,
		svg: !!MapSvg[MAP_NAMES.SHIMBAY],
		items: [
			{
				id: 1,
				title: "2 Bolek",
				name: MAP_NAMES.SHIMBAY_2,
				svg: !!MapSvg[MAP_NAMES.SHIMBAY_2],
			},
		],
	},
	{
		districtId: 10,
		marketId: 10,
		title: "Qońırat",
		name: MAP_NAMES.QONIRAT,
		svg: !!MapSvg[MAP_NAMES.QONIRAT],
	},
	{
		districtId: 11,
		marketId: 11,
		title: "Qanlıkól",
		name: MAP_NAMES.QANLIKOL,
		svg: !!MapSvg[MAP_NAMES.QANLIKOL],
	},
	{
		districtId: 12,
		marketId: 12,
		title: "Shomanay",
		name: MAP_NAMES.SHOMANAY,
		svg: !!MapSvg[MAP_NAMES.SHOMANAY],
	},
	{
		districtId: 13,
		marketId: 13,
		title: "Beruniy",
		name: MAP_NAMES.BERUNIY,
		svg: !!MapSvg[MAP_NAMES.BERUNIY],
	},
	{
		districtId: 14,
		marketId: 14,
		title: "Ellikqala",
		name: MAP_NAMES.ELLIKQALA,
		svg: !!MapSvg[MAP_NAMES.ELLIKQALA],
	},
	{
		districtId: 15,
		marketId: 18,
		title: "Tórtkúl",
		name: MAP_NAMES.TORTKUL,
		svg: !!MapSvg[MAP_NAMES.TORTKUL],
	},
	{
		districtId: 16,
		marketId: 16,
		title: "Ámiwdárya",
		name: MAP_NAMES.AMIWDARYA,
		svg: !!MapSvg[MAP_NAMES.AMIWDARYA],
	},
	{
		districtId: 17,
		marketId: 17,
		title: "Moynaq",
		name: MAP_NAMES.MOYNAQ,
		svg: !!MapSvg[MAP_NAMES.MOYNAQ],
	},
]
