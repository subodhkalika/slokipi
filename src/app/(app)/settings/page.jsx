'use client'

import { useState } from 'react'
import Icon from '@/components/ui/Icon'
import { PrimaryButton } from '@/components/ui/Button'
import useMediaQuery from '@/hooks/useMediaQuery'

const SETTINGS_SECTIONS = [
  {
    title: 'Profile',
    icon: 'person',
    items: [
      { label: 'Full Name', value: 'Alex Reed', type: 'text' },
      { label: 'Email', value: 'alex@slokipi.com', type: 'email' },
      { label: 'Timezone', value: 'Pacific Time (GMT-7)', type: 'select' },
    ],
  },
  {
    title: 'Booking Page',
    icon: 'language',
    items: [
      { label: 'Public URL', value: 'slokipi.com/alex-design', type: 'text' },
      { label: 'Welcome Message', value: "Let's build something great together.", type: 'text' },
      { label: 'Default Duration', value: '45 minutes', type: 'select' },
    ],
  },
  {
    title: 'Notifications',
    icon: 'notifications',
    items: [
      { label: 'Email Reminders', value: true, type: 'toggle' },
      { label: 'SMS Notifications', value: false, type: 'toggle' },
      { label: 'Calendar Sync', value: true, type: 'toggle' },
    ],
  },
]

export default function Settings() {
  const [sections, setSections] = useState(SETTINGS_SECTIONS)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const toggleSetting = (sectionIdx, itemIdx) => {
    setSections((prev) =>
      prev.map((sec, si) =>
        si === sectionIdx
          ? {
              ...sec,
              items: sec.items.map((item, ii) =>
                ii === itemIdx ? { ...item, value: !item.value } : item
              ),
            }
          : sec
      )
    )
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>
          Settings
        </h1>
        {isDesktop && <p className="text-on-surface-variant mt-2">Manage your account and preferences.</p>}
      </section>

      <div className={`${isDesktop ? 'grid grid-cols-2 gap-8' : 'space-y-6'}`}>
        {sections.map((section, si) => (
          <div key={section.title} className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={section.icon} className="text-primary" />
              </div>
              <h2 className="font-headline font-bold text-lg text-on-surface">{section.title}</h2>
            </div>
            <div className="space-y-5">
              {section.items.map((item, ii) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <label className="font-label text-[11px] uppercase tracking-[0.05em] font-semibold text-on-surface-variant">
                      {item.label}
                    </label>
                    {item.type === 'toggle' ? null : (
                      <input
                        type="text"
                        defaultValue={item.value}
                        className="w-full mt-1 px-4 py-3 bg-surface-container-low border-none rounded-lg text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none"
                      />
                    )}
                  </div>
                  {item.type === 'toggle' && (
                    <button
                      onClick={() => toggleSetting(si, ii)}
                      className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${
                        item.value ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${
                          item.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-error/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
              <Icon name="warning" className="text-error" />
            </div>
            <h2 className="font-headline font-bold text-lg text-error">Danger Zone</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-error/10 text-error rounded-lg font-medium text-sm hover:bg-error/20 transition-colors">
              Delete All Event Types
            </button>
            <button className="w-full px-4 py-3 bg-error/10 text-error rounded-lg font-medium text-sm hover:bg-error/20 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {!isDesktop && (
        <div className="pb-8">
          <PrimaryButton icon="check">Save Changes</PrimaryButton>
        </div>
      )}
    </div>
  )
}
