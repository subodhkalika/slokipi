'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import { PrimaryButton } from '@/components/ui/Button'
import useMediaQuery from '@/hooks/useMediaQuery'
import { updateProfile } from '@/lib/actions/profile'

export default function SettingsView({ profile, email }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState(profile?.name || '')
  const [slug, setSlug] = useState(profile?.slug || '')
  const [timezone, setTimezone] = useState(profile?.timezone || 'America/Los_Angeles')
  const [role, setRole] = useState(profile?.role || '')

  const handleSave = async () => {
    setSaving(true)
    const formData = new FormData()
    formData.set('fullName', fullName)
    formData.set('slug', slug)
    formData.set('timezone', timezone)
    formData.set('role', role)
    await updateProfile(formData)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>Settings</h1>
        {isDesktop && <p className="text-on-surface-variant mt-2">Manage your account and preferences.</p>}
      </section>

      <div className={`${isDesktop ? 'grid grid-cols-2 gap-8' : 'space-y-6'}`}>
        {/* Profile */}
        <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Icon name="person" className="text-primary" /></div>
            <h2 className="font-headline font-bold text-lg text-on-surface">Profile</h2>
          </div>
          <div className="space-y-5">
            <div>
              <label className="font-label text-[11px] uppercase tracking-[0.05em] font-semibold text-on-surface-variant">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-surface-container-low border-none rounded-lg text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" />
            </div>
            <div>
              <label className="font-label text-[11px] uppercase tracking-[0.05em] font-semibold text-on-surface-variant">Email</label>
              <input type="email" value={email || ''} disabled
                className="w-full mt-1 px-4 py-3 bg-surface-container-low border-none rounded-lg text-sm text-on-surface-variant outline-none opacity-60" />
            </div>
            <div>
              <label className="font-label text-[11px] uppercase tracking-[0.05em] font-semibold text-on-surface-variant">Role</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Designer, Consultant"
                className="w-full mt-1 px-4 py-3 bg-surface-container-low border-none rounded-lg text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" />
            </div>
            <div>
              <label className="font-label text-[11px] uppercase tracking-[0.05em] font-semibold text-on-surface-variant">Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-surface-container-low border-none rounded-lg text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20">
                <option value="America/Los_Angeles">Pacific Time (GMT-7)</option>
                <option value="America/Denver">Mountain Time (GMT-6)</option>
                <option value="America/Chicago">Central Time (GMT-5)</option>
                <option value="America/New_York">Eastern Time (GMT-4)</option>
                <option value="Europe/London">London (GMT+0)</option>
                <option value="Asia/Kolkata">India (GMT+5:30)</option>
                <option value="Australia/Sydney">Sydney (GMT+11)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Booking Page */}
        <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Icon name="language" className="text-primary" /></div>
            <h2 className="font-headline font-bold text-lg text-on-surface">Booking Page</h2>
          </div>
          <div className="space-y-5">
            <div>
              <label className="font-label text-[11px] uppercase tracking-[0.05em] font-semibold text-on-surface-variant">Public URL Slug</label>
              <div className="flex items-center mt-1 bg-surface-container-low rounded-lg overflow-hidden">
                <span className="px-3 text-sm text-on-surface-variant">slokipi.com/</span>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-2 py-3 bg-transparent border-none text-sm text-on-surface outline-none focus:ring-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-error/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center"><Icon name="warning" className="text-error" /></div>
            <h2 className="font-headline font-bold text-lg text-error">Danger Zone</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-error/10 text-error rounded-lg font-medium text-sm hover:bg-error/20 transition-colors">Delete All Event Types</button>
            <button className="w-full px-4 py-3 bg-error/10 text-error rounded-lg font-medium text-sm hover:bg-error/20 transition-colors">Delete Account</button>
          </div>
        </div>
      </div>

      <div className={isDesktop ? 'flex justify-end' : 'pb-8'}>
        <PrimaryButton icon={saving ? undefined : 'check'} onClick={handleSave} className={isDesktop ? 'w-auto px-8' : ''}>
          {saving ? 'Saving...' : 'Save Changes'}
        </PrimaryButton>
      </div>
    </div>
  )
}
