import { type CSSProperties, type FC, type ReactNode } from "react"
import {
	Breadcrumb,
	type BreadcrumbProps,
	Card,
	Flex,
	SkeletonButton,
	Space,
	Title,
} from "src/shared/ui"

interface PageHeaderProps {
	title: string
	extra?: ReactNode
	breadcrumbs?: BreadcrumbProps["items"]
	style?: CSSProperties
	loading?: boolean
}

const PageHeader: FC<PageHeaderProps> = ({
	style,
	title,
	breadcrumbs,
	extra,
	loading,
}) => {
	const titleComp = (
		<Title
			level={4}
			style={{ fontSize: 18 }}
		>
			{title}
		</Title>
	)
	const breadcrumbComp = breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : null

	const extraComp = <Space wrap={true}>{extra}</Space>

	return (
		<>
			<Card style={style}>
				{loading ? (
					<SkeletonButton
						size={breadcrumbs ? "large" : "small"}
						block={true}
						active={true}
					/>
				) : (
					<Flex
						justify={"space-between"}
						align={"start"}
						gap={4}
						wrap={true}
					>
						{extra ? (
							<Flex vertical={true}>
								{titleComp}
								{breadcrumbComp}
							</Flex>
						) : (
							titleComp
						)}
						{extra ? extraComp : breadcrumbComp}
					</Flex>
				)}
			</Card>
		</>
	)
}

export { PageHeader }
