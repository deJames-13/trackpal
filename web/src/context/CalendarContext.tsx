import React, { createContext, useContext, useState } from 'react'
import type { CalendarEvent } from '../types'
import { initialCalendarEvents } from '../lib/mockData'

interface CalendarContextType {
  events: CalendarEvent[]
  addEvent: (event: CalendarEvent) => void
  getEventsForDate: (dateString: string) => CalendarEvent[]
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
)

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialCalendarEvents)

  const addEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event])
  }

  const getEventsForDate = (dateString: string) => {
    return events.filter((ev) => ev.date === dateString)
  }

  return (
    <CalendarContext.Provider value={{ events, addEvent, getEventsForDate }}>
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar() {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  return context
}
