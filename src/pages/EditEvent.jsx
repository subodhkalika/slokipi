import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'

const COLORS = [
  { name: 'Indigo', hex: '#4f4dcf' },
  { name: 'Purple', hex: '#755478' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Slate', hex: '#526074' },
]
const DURATIONS = ['15 min', '30 min', '45 min', '60 min']
const LOCATIONS = [
  { label: 'Video Call', icon: 'videocam' },
  { label: 'In Person', icon: 'location_on' },
  { label: 'Phone', icon: 'call' },
]

export default function EditEvent() {
  const [name, setName] = useState('1:1 Strategy Call')
  const [description, setDescription] = useState('A focused session to discuss your product strategy and design system')
  const [duration, setDuration] = useState('30 min')
  const [location, setLocation] = useState('Video Call')
  const [color, setColor] = useState('#4f4dcf')
  const [isFree, setIsFree] = useState(true)
  const [price, setPrice] = useState('')
  const [buffer, setBuffer] = useState('15 minutes')
  const [limit, setLimit] = useState('5')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const navigate = useNavigate()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleSave = () => navigate('/events')
  const handleDelete = () => navigate('/events')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {isDesktop && (
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-2">
              <Icon name="arrow_back" className="text-sm" /> Events
            </button>
          )}
          <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>
            Edit Event Type
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isDesktop && (
            <button onClick={() => setShowDeleteConfirm(true)} className="p-2 rounded-full hover:bg-error/10 transition-colors">
              <Icon name="delete" className="text-error" />
            </button>
          )}
          {!isDesktop && (
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <Icon name="close" className="text-on-surface-variant" />
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-on-surface/30 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl p-8 max-w-sm w-full shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto">
              <Icon name="warning" className="text-error" size="32px" />
            </div>
            <div className="text-center">
              <h3 className="font-headline font-bold text-xl text-on-surface mb-2">Delete Event Type?</h3>
              <p className="text-sm text-on-surface-variant">This will permanently remove "1:1 Strategy Call" and cancel all future bookings.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 bg-surface-container-high rounded-xl font-semibold text-on-surface text-sm">
                Keep it
              </button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-error text-on-error rounded-xl font-semibold text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={isDesktop ? 'grid grid-cols-5 gap-8' : 'space-y-6'}>
        {/* Form */}
        <div className={`${isDesktop ? 'col-span-3' : ''} space-y-6`}>
          {/* Color Picker */}
          <div className="space-y-3">
            <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Color</label>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button key={c.hex} onClick={() => setColor(c.hex)}
                  className={`w-10 h-10 rounded-full transition-all ${color === c.hex ? 'ring-4 ring-primary/30 scale-110' : 'hover:scale-105'}`}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Event Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
                <Icon name="edit" />
              </div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface font-body text-lg outline-none" />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Duration</label>
            <div className="flex gap-3 flex-wrap">
              {DURATIONS.map((d) => (
                <button key={d} onClick={() => setDuration(d)}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${duration === d
                    ? 'primary-gradient text-on-primary shadow-lg shadow-primary/20'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full px-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface font-body text-base outline-none resize-none" />
          </div>

          {/* Location */}
          <div className="space-y-3">
            <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Location</label>
            <div className="grid grid-cols-3 gap-3">
              {LOCATIONS.map((loc) => (
                <button key={loc.label} onClick={() => setLocation(loc.label)}
                  className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl transition-all ${location === loc.label
                    ? 'bg-primary/10 ring-2 ring-primary/20 text-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}>
                  <Icon name={loc.icon} />
                  <span className="text-xs font-medium">{loc.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-3">
            <div className="flex items-center justify-between ml-1">
              <label className="font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Price</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant">Free</span>
                <button onClick={() => setIsFree(!isFree)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${isFree ? 'bg-primary' : 'bg-surface-container-high'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${isFree ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
            {!isFree && (
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant"><Icon name="attach_money" /></div>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00"
                  className="w-full pl-14 pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-on-surface font-body text-lg outline-none" />
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className={`${isDesktop ? 'col-span-2' : ''} space-y-6`}>
          {isDesktop && (
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
              <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-4">Live Preview</h3>
              <div className="rounded-xl p-5 border border-outline-variant/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-headline font-bold text-on-surface">{name || 'Event Name'}</span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant text-xs">
                  <span className="flex items-center gap-1"><Icon name="schedule" className="text-sm" /> {duration}</span>
                  <span className="flex items-center gap-1"><Icon name={LOCATIONS.find(l => l.label === location)?.icon || 'videocam'} className="text-sm" /> {location}</span>
                </div>
                <p className="text-sm text-on-surface-variant">{description || 'No description...'}</p>
              </div>
            </div>
          )}

          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 space-y-5">
            <div className="space-y-2">
              <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Buffer Time</label>
              <select value={buffer} onChange={(e) => setBuffer(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20">
                <option>5 minutes</option><option>10 minutes</option><option>15 minutes</option><option>30 minutes</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Max Bookings / Day</label>
              <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`flex gap-4 ${isDesktop ? 'justify-between' : 'flex-col'} ${!isDesktop ? 'pb-32' : ''}`}>
        {isDesktop && (
          <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-3 bg-error/10 text-error rounded-xl font-semibold text-sm hover:bg-error/20 transition-colors flex items-center gap-2">
            <Icon name="delete" className="text-sm" /> Delete Event Type
          </button>
        )}
        <div className="flex gap-4">
          {isDesktop && <SecondaryButton onClick={() => navigate(-1)}>Cancel</SecondaryButton>}
          <PrimaryButton icon="check" onClick={handleSave} className={isDesktop ? 'w-auto px-8' : ''}>
            Save Changes
          </PrimaryButton>
        </div>
      </div>

      {/* Mobile delete button */}
      {!isDesktop && (
        <button onClick={() => setShowDeleteConfirm(true)} className="w-full py-4 text-error font-semibold text-sm hover:bg-error/5 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Icon name="delete" className="text-sm" /> Delete Event Type
        </button>
      )}
    </div>
  )
}
