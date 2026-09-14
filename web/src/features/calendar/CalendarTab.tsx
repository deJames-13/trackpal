import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  Sparkles,
} from 'lucide-react'
import type { CalendarEvent } from '../../types'
import { useCalendar } from '../../context/CalendarContext'
import { useGroups } from '../../context/GroupsContext'
import { useModals } from '../../context/ModalContext'

export const CalendarTab: React.FC = () => {
  const { events } = useCalendar()
  const { getGroupById } = useGroups()
  const { openContribution } = useModals()
  const navigate = useNavigate()

  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-09-18')

  // Month info (September 2026)
  const daysInSeptember = 30
  const startingDayOffset = 2 // Sept 1, 2026 is a Tuesday (index 2: Sun=0, Mon=1, Tue=2)

  const daysArray = Array.from({ length: daysInSeptember }, (_, i) => i + 1)

  const getEventsForDay = (day: number) => {
    const formattedDate = `2026-09-${day.toString().padStart(2, '0')}`
    return events.filter((e) => e.date === formattedDate)
  }

  const handleDayClick = (day: number) => {
    const formattedDate = `2026-09-${day.toString().padStart(2, '0')}`
    setSelectedDate(formattedDate)
  }

  const handleEventAction = (ev: CalendarEvent) => {
    const group = getGroupById(ev.groupId)
    if (!group) return

    if (ev.type === 'payout_day') {
      navigate({ to: '/groups/$groupId', params: { groupId: ev.groupId } })
    } else {
      openContribution(group)
    }
  }

  const selectedDayEvents = selectedDate
    ? getEventsForDay(Number(selectedDate.split('-')[2]))
    : []

  return (
    <div className="space-y-6">
      {/* Header & Controls in Bento Card */}
      <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#F5B800] text-neutral-950 flex items-center justify-center font-black shadow-xs">
            <CalendarIcon className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-black text-neutral-950 dark:text-white tracking-tight">
              September 2026
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Hulog deadlines and payout turn distribution schedule
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Legend Chips */}
          <div className="flex items-center gap-3 text-xs font-bold text-neutral-700 dark:text-neutral-300 mr-1">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span>Payout (Sahod)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#F5B800]"
                aria-hidden="true"
              />
              <span>Hulog Due</span>
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1">
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === 'month'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Week
            </button>
          </div>

          {/* Month Steppers */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
              title="Previous Month"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
              title="Next Month"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar Grid Area in Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* The Grid */}
        <div className="lg:col-span-8 bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          {/* Day of Week Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-black text-neutral-400 dark:text-neutral-500 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 pt-3">
            {/* Empty offset days for start of month */}
            {Array.from({ length: startingDayOffset }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="h-20 sm:h-24 p-1.5 rounded-xl bg-neutral-50/50 dark:bg-neutral-800/20 border border-transparent opacity-30"
              />
            ))}

            {/* Actual Days */}
            {daysArray.map((day) => {
              const formattedDate = `2026-09-${day.toString().padStart(2, '0')}`
              const dayEvents = getEventsForDay(day)
              const isSelected = selectedDate === formattedDate
              const isToday = day === 14

              return (
                <div
                  key={day}
                  id={`calendar-day-${day}`}
                  onClick={() => handleDayClick(day)}
                  className={`h-20 sm:h-24 p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800] ${
                    isSelected
                      ? 'border-[#F5B800] bg-[#F5B800]/10 ring-2 ring-[#F5B800]'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleDayClick(day)
                    }
                  }}
                  aria-label={`${formattedDate} with ${dayEvents.length} events`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-black rounded-md w-5 h-5 flex items-center justify-center ${
                        isToday
                          ? 'bg-[#F5B800] text-neutral-950 font-black'
                          : 'text-neutral-900 dark:text-neutral-100'
                      }`}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#F5B800]"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Day Badges */}
                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold truncate flex items-center gap-1 ${
                          ev.type === 'payout_day'
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                            : 'bg-[#F5B800] text-neutral-950'
                        }`}
                        title={`${ev.groupName} - ${ev.type === 'payout_day' ? 'Payout' : 'Hulog'}`}
                      >
                        {ev.type === 'payout_day' ? (
                          <span>Sahod: ₱{ev.amount / 1000}k</span>
                        ) : (
                          <span>Due: ₱{ev.amount / 1000}k</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Selected Date Schedule & Action Flyout */}
        <div className="lg:col-span-4 bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800 mb-4">
              <span className="text-[10px] uppercase font-black text-neutral-400 block tracking-wider">
                Schedule Inspector
              </span>
              <h3 className="text-xl font-black text-neutral-950 dark:text-white tracking-tight mt-0.5">
                {selectedDate ? selectedDate : 'Select a date'}
              </h3>
            </div>

            {selectedDayEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700/70 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                          ev.type === 'payout_day'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-[#F5B800] text-neutral-950'
                        }`}
                      >
                        {ev.type === 'payout_day'
                          ? 'Payout Distribution'
                          : 'Hulog Deadline'}
                      </span>
                      <span className="text-base font-black text-neutral-950 dark:text-white">
                        ₱{ev.amount.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-neutral-950 dark:text-neutral-100">
                      {ev.groupName}
                    </p>

                    {ev.recipientName && (
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Turn Recipient:{' '}
                        <strong className="text-neutral-800 dark:text-neutral-200">
                          {ev.recipientName}
                        </strong>
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => handleEventAction(ev)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] transition-all cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
                    >
                      <CreditCard
                        className="w-3.5 h-3.5 stroke-[2.5]"
                        aria-hidden="true"
                      />
                      <span>
                        {ev.type === 'payout_day'
                          ? 'View Circle Ledger'
                          : 'Submit Hulog'}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-neutral-400 space-y-2">
                <Clock
                  className="w-8 h-8 mx-auto opacity-40 text-neutral-400"
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold">
                  No scheduled deadlines or payouts on this day.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mt-4">
            <Sparkles
              className="w-4 h-4 text-[#8A6300] dark:text-[#FACC15] shrink-0"
              aria-hidden="true"
            />
            <span>
              Automatic reminders notify members 48 hours before collection
              cutoffs.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
