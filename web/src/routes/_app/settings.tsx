import { createFileRoute } from '@tanstack/react-router'
import { SettingsTab } from '../../features/settings/SettingsTab'

export const Route = createFileRoute('/_app/settings')({
  component: SettingsTab,
})
