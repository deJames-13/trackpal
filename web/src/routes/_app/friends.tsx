import { createFileRoute } from '@tanstack/react-router'
import { SocialTab } from '../../features/social/SocialTab'

export const Route = createFileRoute('/_app/friends')({
  component: SocialTab,
})
