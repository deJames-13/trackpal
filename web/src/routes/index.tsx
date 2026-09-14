import { createFileRoute } from '@tanstack/react-router'
import { GuestLanding } from '../features/landing/GuestLanding'

export const Route = createFileRoute('/')({ component: GuestLanding })
