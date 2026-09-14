import { createFileRoute } from '@tanstack/react-router'
import { CalendarTab } from '../../features/calendar/CalendarTab'

export const Route = createFileRoute('/_app/calendar')({
  component: CalendarTab,
})
