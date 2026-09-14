import { createFileRoute } from '@tanstack/react-router'
import { GroupDetailTab } from '../../../features/groups/GroupDetailTab'

export const Route = createFileRoute('/_app/groups/$groupId')({
  component: GroupDetailRoute,
})

function GroupDetailRoute() {
  const { groupId } = Route.useParams()
  return <GroupDetailTab groupId={groupId} />
}
