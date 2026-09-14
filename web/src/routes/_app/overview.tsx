import { createFileRoute } from '@tanstack/react-router'
import { OverviewTab } from '../../features/groups/OverviewTab'

export const Route = createFileRoute('/_app/overview')({
  component: OverviewTab,
})
