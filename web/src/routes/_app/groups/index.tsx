import { createFileRoute } from '@tanstack/react-router'
import { GroupsListTab } from '../../../features/groups/GroupsListTab'

export const Route = createFileRoute('/_app/groups/')({
  component: GroupsListTab,
})
