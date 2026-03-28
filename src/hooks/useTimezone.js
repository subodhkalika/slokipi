'use client'

import { useState, useEffect } from 'react'

const TIMEZONE_LABELS = {
  'America/Los_Angeles': 'Pacific Time (PT)',
  'America/Denver': 'Mountain Time (MT)',
  'America/Chicago': 'Central Time (CT)',
  'America/New_York': 'Eastern Time (ET)',
  'Europe/London': 'London (GMT)',
  'Europe/Paris': 'Central European (CET)',
  'Asia/Kolkata': 'India (IST)',
  'Asia/Tokyo': 'Japan (JST)',
  'Australia/Sydney': 'Sydney (AEST)',
}

export default function useTimezone() {
  const [timezone, setTimezone] = useState('America/Los_Angeles')
  const [label, setLabel] = useState('Pacific Time (PT)')

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(tz)
    setLabel(TIMEZONE_LABELS[tz] || tz)
  }, [])

  const offset = () => {
    const now = new Date()
    const offsetMin = now.getTimezoneOffset()
    const hours = Math.abs(Math.floor(offsetMin / 60))
    const mins = Math.abs(offsetMin % 60)
    const sign = offsetMin <= 0 ? '+' : '-'
    return `GMT${sign}${hours}${mins > 0 ? `:${String(mins).padStart(2, '0')}` : ''}`
  }

  return { timezone, label, offset: offset() }
}
