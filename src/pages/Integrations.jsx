import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'

const SECTIONS = [
  {
    title: 'Calendar',
    items: [
      { name: 'Google Calendar', icon: 'event', desc: 'Sync your bookings automatically', connected: true },
      { name: 'Outlook Calendar', icon: 'calendar_today', desc: 'Microsoft 365 calendar sync', connected: false },
      { name: 'Apple Calendar', icon: 'phone_iphone', desc: 'iCal integration', connected: false },
    ],
  },
  {
    title: 'Video Conferencing',
    items: [
      { name: 'Google Meet', icon: 'videocam', desc: 'Auto-generate meeting links', connected: true },
      { name: 'Zoom', icon: 'video_call', desc: 'Create Zoom meetings automatically', connected: false },
      { name: 'Microsoft Teams', icon: 'groups', desc: 'Teams meeting integration', connected: false },
    ],
  },
  {
    title: 'Payments',
    items: [
      { name: 'Stripe', icon: 'credit_card', desc: 'Accept payments for bookings', connected: false },
    ],
  },
  {
    title: 'Other',
    items: [
      { name: 'Slack', icon: 'chat', desc: 'Get booking notifications in Slack', connected: false },
      { name: 'Zapier', icon: 'bolt', desc: 'Connect with 5,000+ apps', connected: false },
    ],
  },
]

export default function Integrations() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="space-y-8">
      <div>
        {isDesktop && <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-primary">Connect</span>}
        <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>Integrations</h1>
        {isDesktop && <p className="text-on-surface-variant mt-2">Connect your favorite tools to supercharge your workflow.</p>}
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">{section.title}</h2>
          <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
            {section.items.map((item) => (
              <div key={item.name} className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.connected ? 'bg-primary/10' : 'bg-surface-container-low'}`}>
                      <Icon name={item.icon} className={item.connected ? 'text-primary' : 'text-on-surface-variant'} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-on-surface">{item.name}</h3>
                      {item.connected && (
                        <span className="flex items-center gap-1 text-[10px] font-label uppercase tracking-wider text-green-600 font-semibold">
                          <Icon name="check_circle" className="text-xs" /> Connected
                        </span>
                      )}
                    </div>
                  </div>
                  {item.connected && (
                    <button className="p-1.5 rounded-lg hover:bg-surface-container-low transition-colors">
                      <Icon name="settings" className="text-on-surface-variant text-sm" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mb-4 flex-1">{item.desc}</p>
                {item.connected ? (
                  <button className="w-full py-2.5 bg-surface-container-low rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors">
                    Disconnect
                  </button>
                ) : (
                  <button className="w-full py-2.5 primary-gradient text-white rounded-lg text-sm font-semibold shadow-sm">
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
