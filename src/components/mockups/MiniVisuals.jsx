import { Bot, Check, Fingerprint, IndianRupee, Package, Receipt, ShoppingCart, UserRound, Users } from 'lucide-react'

/* Small product illustrations used on the homepage solution cards. */

function CrmMini() {
  const cols = [
    { t: 'New', n: 3, c: '#f0475a' },
    { t: 'Contacted', n: 2, c: '#ff8a5b' },
    { t: 'Won', n: 2, c: '#22c55e' },
  ]
  return (
    <div className="mv mv--crm">
      {cols.map((col) => (
        <div className="mv-col" key={col.t}>
          <span className="mv-col__head">
            <i style={{ background: col.c }} />
            {col.t}
          </span>
          {Array.from({ length: col.n }, (_, i) => (
            <span className="mv-lead" key={i}>
              <span className="mv-avatar" style={{ background: col.c }} />
              <span className="mv-lines">
                <b style={{ width: `${70 - i * 12}%` }} />
                <b style={{ width: `${45 + i * 8}%` }} />
              </span>
            </span>
          ))}
        </div>
      ))}
      <span className="mv-toast">
        <Users aria-hidden="true" /> New lead added
      </span>
    </div>
  )
}

function ErpMini() {
  const mods = [
    { i: ShoppingCart, t: 'Sales' },
    { i: Receipt, t: 'Billing' },
    { i: Package, t: 'Inventory' },
    { i: UserRound, t: 'Staff' },
  ]
  return (
    <div className="mv mv--erp">
      <svg className="mv-erp__lines" viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M100 60 L38 22 M100 60 L162 22 M100 60 L38 98 M100 60 L162 98" />
      </svg>
      {mods.map(({ i: Icon, t }, k) => (
        <span className={`mv-mod mv-mod--${k}`} key={t}>
          <Icon aria-hidden="true" />
          {t}
        </span>
      ))}
      <span className="mv-hub">ERP</span>
    </div>
  )
}

function FlexMini() {
  const bars = [40, 62, 48, 80, 66, 92, 74]
  return (
    <div className="mv mv--flex">
      <div className="mv-ring">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="26" className="mv-ring__track" />
          <circle cx="32" cy="32" r="26" className="mv-ring__bar" strokeDasharray="163" strokeDashoffset="36" />
        </svg>
        <span>
          <b>78%</b>
          <small>Attendance</small>
        </span>
      </div>
      <div className="mv-bars">
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}

function PayrollMini() {
  return (
    <div className="mv mv--pay">
      <div className="mv-slip">
        <span className="mv-slip__head">
          <span className="mv-avatar" />
          <span className="mv-lines">
            <b style={{ width: '60%' }} />
            <b style={{ width: '38%' }} />
          </span>
          <span className="mv-badge">
            <Check aria-hidden="true" /> Paid
          </span>
        </span>
        {['Basic', 'Allowances', 'Deductions'].map((r, i) => (
          <span className="mv-slip__row" key={r}>
            <span>{r}</span>
            <b style={{ width: `${[64, 36, 22][i]}%` }} className={i === 2 ? 'is-neg' : ''} />
          </span>
        ))}
        <span className="mv-slip__total">
          <span>Net pay</span>
          <strong>
            <IndianRupee aria-hidden="true" />
            ••,•••
          </strong>
        </span>
      </div>
      <span className="mv-chip">
        <Fingerprint aria-hidden="true" /> Biometric sync
      </span>
    </div>
  )
}

function ChatMini() {
  return (
    <div className="mv mv--chat">
      <span className="mv-msg mv-msg--user">Do you deliver on weekends?</span>
      <span className="mv-msg mv-msg--bot">
        <Bot aria-hidden="true" />
        Yes! Weekend delivery is available in your area.
      </span>
      <span className="mv-msg mv-msg--bot mv-msg--typing">
        <span className="typing">
          <span />
          <span />
          <span />
        </span>
      </span>
    </div>
  )
}

const MAP = { crm: CrmMini, erp: ErpMini, flexflow: FlexMini, payroll: PayrollMini, chatbot: ChatMini }

export default function MiniVisual({ type }) {
  const C = MAP[type]
  return C ? <C /> : null
}
