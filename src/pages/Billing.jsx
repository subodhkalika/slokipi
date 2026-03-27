import Icon from '../components/Icon'
import { PrimaryButton } from '../components/Button'
import useMediaQuery from '../hooks/useMediaQuery'

const FEATURES = ['Unlimited event types', 'Custom branding', 'Priority support', 'Advanced analytics', 'Team scheduling']
const INVOICES = [
  { date: 'Oct 1, 2023', description: 'Pro Plan - Monthly', amount: '$29.00', status: 'Paid' },
  { date: 'Sep 1, 2023', description: 'Pro Plan - Monthly', amount: '$29.00', status: 'Paid' },
  { date: 'Aug 1, 2023', description: 'Pro Plan - Monthly', amount: '$29.00', status: 'Paid' },
]
const PLANS = [
  { name: 'Free', price: '$0', period: '/month', features: ['3 event types', '50 bookings/month', 'Basic calendar sync'], current: false },
  { name: 'Pro', price: '$29', period: '/month', features: ['Unlimited events', 'Custom branding', 'Priority support', 'Analytics'], current: true },
  { name: 'Enterprise', price: '$99', period: '/month', features: ['Everything in Pro', 'Team scheduling', 'SSO', 'Dedicated support', 'API access'], current: false },
]

export default function Billing() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>Billing</h1>
        {isDesktop && <p className="text-on-surface-variant mt-2">Manage your subscription and payment details.</p>}
      </div>

      <div className={isDesktop ? 'grid grid-cols-2 gap-8' : 'space-y-6'}>
        {/* Current Plan */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline font-bold text-xl text-on-surface">Pro Plan</h2>
                <span className="px-2.5 py-0.5 primary-gradient text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Current</span>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-headline text-3xl font-extrabold text-on-surface">$29</span>
                <span className="text-on-surface-variant text-sm">/month</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant">Renews October 28, 2023</p>
          <div className="space-y-2">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Icon name="check_circle" className="text-primary text-sm" />
                <span className="text-sm text-on-surface">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-surface-container-low rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container transition-colors">
            Change Plan
          </button>
        </div>

        {/* Payment Method + Usage */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 space-y-4">
            <h3 className="font-headline font-bold text-on-surface">Payment Method</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="credit_card" className="text-primary text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Visa ending in 4242</p>
                <p className="text-xs text-on-surface-variant">Expires 12/2025</p>
              </div>
              <button className="text-primary text-sm font-semibold hover:underline">Update</button>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10">
            <h3 className="font-headline font-bold text-on-surface mb-4">This Month</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{ label: 'Bookings', value: '28' }, { label: 'Clients', value: '12' }, { label: 'Revenue', value: '$725' }].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="font-headline font-extrabold text-xl text-on-surface">{s.value}</span>
                  <p className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="space-y-4">
        <h2 className="font-headline font-bold text-lg text-on-surface">Invoice History</h2>
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10">
          {INVOICES.map((inv, i) => (
            <div key={i} className="p-4 lg:p-5 flex items-center justify-between hover:bg-surface transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
                  <Icon name="receipt" className="text-on-surface-variant text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-on-surface">{inv.description}</p>
                  <p className="text-xs text-on-surface-variant">{inv.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-on-surface">{inv.amount}</span>
                <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[10px] font-bold rounded-full uppercase">{inv.status}</span>
                {isDesktop && (
                  <button className="text-primary text-xs font-medium hover:underline">PDF</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison (Desktop) */}
      {isDesktop && (
        <div className="space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">Compare Plans</h2>
          <div className="grid grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`rounded-xl p-6 border ${plan.current ? 'border-primary/30 bg-primary/5' : 'border-outline-variant/10 bg-surface-container-lowest'}`}>
                <h3 className="font-headline font-bold text-lg text-on-surface">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="font-headline text-3xl font-extrabold text-on-surface">{plan.price}</span>
                  <span className="text-on-surface-variant text-sm">{plan.period}</span>
                </div>
                <div className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Icon name="check" className="text-primary text-sm" />
                      <span className="text-sm text-on-surface-variant">{f}</span>
                    </div>
                  ))}
                </div>
                {plan.current ? (
                  <div className="py-2.5 text-center text-sm font-medium text-primary">Current Plan</div>
                ) : (
                  <button className="w-full py-2.5 bg-surface-container-low rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors">
                    {plan.name === 'Free' ? 'Downgrade' : 'Upgrade'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
