export type Screen = 'guest' | 'onboarding' | 'auth' | 'dashboard'

export type DashboardTab =
  'overview' | 'groups' | 'group-detail' | 'calendar' | 'friends' | 'settings'

export type PayoutFrequency = 'weekly' | 'semi-monthly' | 'monthly'

export type RotationStatus = 'paid_out' | 'current_pot' | 'upcoming'

export type PaymentStatus = 'paid' | 'pending' | 'overdue'

export interface PaluwaganMember {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  slotNumber: number
  payoutDate: string
  isCurrentUser?: boolean
  status: RotationStatus
  currentCyclePaid: boolean
  paymentMethod?: string
  paymentRef?: string
  paidAt?: string
  trustScore: number
}

export interface PaluwaganGroup {
  id: string
  name: string
  description: string
  category: 'Personal' | 'Family' | 'Office' | 'Business'
  potAmount: number
  contributionAmount: number
  frequency: PayoutFrequency
  totalRounds: number
  currentRound: number
  startDate: string
  nextPayoutDate: string
  currency: string
  organizer: {
    id: string
    name: string
    avatar: string
    trustScore: number
  }
  members: PaluwaganMember[]
  rules: string[]
}

export interface CalendarEvent {
  id: string
  groupId: string
  groupName: string
  type: 'contribution_deadline' | 'payout_day'
  date: string
  amount: number
  recipientName?: string
  isCurrentUserRecipient?: boolean
  status: 'pending' | 'completed' | 'urgent'
}

export interface Friend {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  isOnline: boolean
  trustScore: number
  completedCircles: number
  mutualGroups: number
  status: 'active' | 'idle'
}

export interface CurrentUser {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  trustScore: number
  completedCycles: number
  onTimeRate: number
  totalContributed: number
  totalReceived: number
  role: 'Organizer & Saver'
}
