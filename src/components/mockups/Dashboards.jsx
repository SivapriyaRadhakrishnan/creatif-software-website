import {
  BarChart3,
  Bell,
  Bot,
  Boxes,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Dumbbell,
  FileText,
  Fingerprint,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  Phone,
  Receipt,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react'

/*
 * Illustrative product interfaces. Figures shown are sample UI data,
 * not company statistics.
 */

function WindowChrome({ title, dark = false, children, className = '' }) {
  return (
    <div className={`app ${dark ? 'app--dark' : ''} ${className}`} role="img" aria-label={`${title} interface preview`}>
      <div className="app__bar" aria-hidden="true">
        <span className="app__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="app__url">{title}</span>
        <span className="app__bar-end" />
      </div>
      <div className="app__body" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}

function Sidebar({ items, active = 0, dark }) {
  return (
    <aside className={`app__side ${dark ? 'is-dark' : ''}`}>
      <span className="app__brand">
        <i>if</i>
      </span>
      {items.map((Icon, i) => (
        <span key={i} className={`app__nav ${i === active ? 'is-active' : ''}`}>
          <Icon />
        </span>
      ))}
      <span className="app__nav app__nav--end">
        <Settings />
      </span>
    </aside>
  )
}

function AreaChart({ points, id, stroke = '#e41f34' }) {
  const w = 300
  const h = 110
  const max = Math.max(...points)
  const step = w / (points.length - 1)
  const coords = points.map((p, i) => [i * step, h - (p / max) * (h - 12) - 4])
  const d = coords.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = coords[i - 1]
    const cx = (px + x) / 2
    return `${acc} C${cx},${py} ${cx},${y} ${x},${y}`
  }, '')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart-area" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} className="chart-grid" />
      ))}
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2.5" className="chart-line" />
      <circle cx={coords.at(-1)[0] - 1} cy={coords.at(-1)[1]} r="4" fill="#fff" stroke={stroke} strokeWidth="2.5" />
    </svg>
  )
}

function Bars({ values, className = '' }) {
  const max = Math.max(...values)
  return (
    <div className={`chart-bars ${className}`}>
      {values.map((v, i) => (
        <i key={i} style={{ height: `${(v / max) * 100}%` }} className={i === values.length - 2 ? 'is-peak' : ''} />
      ))}
    </div>
  )
}

/* ---------------- Home hero: the whole ecosystem ---------------- */
export function HeroDashboard() {
  return (
    <WindowChrome title="app.creatif.suite / overview" className="app--hero">
      <Sidebar items={[LayoutDashboard, Users, Boxes, Wallet, Bot, BarChart3]} />
      <div className="app__main">
        <div className="app__top">
          <div>
            <small className="muted">Good morning</small>
            <strong className="app__title">Business overview</strong>
          </div>
          <span className="app__search">
            <Search /> Search anything
          </span>
          <span className="app__bell">
            <Bell />
            <i />
          </span>
        </div>
        <div className="kpis">
          {[
            { l: 'Revenue', v: '₹ 8.4L', d: '+12.4%', icon: TrendingUp },
            { l: 'Active customers', v: '1,284', d: '+8.1%', icon: Users },
            { l: 'Invoices', v: '342', d: '+5.6%', icon: Receipt },
            { l: 'Payroll', v: 'On track', d: 'Due 30th', icon: Wallet },
          ].map((k) => (
            <div className="kpi" key={k.l}>
              <span className="kpi__icon">
                <k.icon />
              </span>
              <small>{k.l}</small>
              <strong>{k.v}</strong>
              <em>{k.d}</em>
            </div>
          ))}
        </div>
        <div className="app__grid">
          <div className="panel panel--chart">
            <div className="panel__head">
              <strong>Sales performance</strong>
              <span className="seg">
                <i className="is-on">Week</i>
                <i>Month</i>
                <i>Year</i>
              </span>
            </div>
            <AreaChart id="hero-area" points={[22, 30, 26, 38, 34, 48, 44, 58, 54, 70, 66, 82]} />
          </div>
          <div className="panel">
            <div className="panel__head">
              <strong>Modules</strong>
            </div>
            <ul className="mod-list">
              {[
                ['CRM', 92, Users],
                ['ERP', 78, Boxes],
                ['Payroll', 100, Wallet],
                ['AI Chatbot', 64, Bot],
              ].map(([n, p, Icon]) => (
                <li key={n}>
                  <span className="mod-list__icon">
                    <Icon />
                  </span>
                  <span className="mod-list__name">{n}</span>
                  <span className="meter">
                    <i style={{ width: `${p}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WindowChrome>
  )
}

/* ---------------- CRM ---------------- */
export function CRMDashboard() {
  const stages = [
    { t: 'New leads', c: '#f0475a', cards: [['Arun Traders', 'Website enquiry'], ['Meera Textiles', 'Referral']] },
    { t: 'Follow-up', c: '#ff8a5b', cards: [['Kochi Motors', 'Call at 4:30 PM'], ['Leaf Café', 'Send proposal']] },
    { t: 'Closed won', c: '#22c55e', cards: [['Blue Pharma', 'Onboarding']] },
  ]
  return (
    <WindowChrome title="crm.creatif / pipeline" className="app--crm">
      <Sidebar items={[LayoutDashboard, Users, CalendarCheck, Mail, BarChart3]} active={1} />
      <div className="app__main">
        <div className="app__top">
          <strong className="app__title">Sales pipeline</strong>
          <span className="pill-btn">
            <UserPlus /> Add lead
          </span>
        </div>
        <div className="kanban">
          {stages.map((s) => (
            <div className="kanban__col" key={s.t}>
              <span className="kanban__head">
                <i style={{ background: s.c }} /> {s.t}
                <em>{s.cards.length}</em>
              </span>
              {s.cards.map(([n, sub]) => (
                <div className="deal" key={n}>
                  <span className="deal__avatar" style={{ background: s.c }}>
                    {n[0]}
                  </span>
                  <span className="deal__text">
                    <strong>{n}</strong>
                    <small>{sub}</small>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </WindowChrome>
  )
}

export function CRMContactCard() {
  return (
    <div className="float-card contact-card" aria-hidden="true">
      <div className="contact-card__head">
        <span className="deal__avatar" style={{ background: '#e41f34' }}>
          K
        </span>
        <span>
          <strong>Kochi Motors</strong>
          <small>Customer since 2024</small>
        </span>
      </div>
      <div className="contact-card__actions">
        <span>
          <Phone /> Call
        </span>
        <span>
          <Mail /> Email
        </span>
        <span>
          <CalendarCheck /> Meet
        </span>
      </div>
      <ul className="timeline-mini">
        <li className="is-done">
          <Check /> Enquiry received
        </li>
        <li className="is-done">
          <Check /> Demo completed
        </li>
        <li>
          <Clock /> Follow-up today, 4:30 PM
        </li>
      </ul>
    </div>
  )
}

/* ---------------- ERP ---------------- */
export function ERPDashboard() {
  return (
    <WindowChrome title="erp.creatif / operations" dark className="app--erp">
      <Sidebar items={[LayoutDashboard, ShoppingCart, Receipt, Package, Users]} dark />
      <div className="app__main">
        <div className="app__top">
          <strong className="app__title">Operations</strong>
          <span className="seg seg--dark">
            <i className="is-on">Today</i>
            <i>7D</i>
            <i>30D</i>
          </span>
        </div>
        <div className="erp-tiles">
          {[
            ['Sales', '₹ 2.6L', ShoppingCart],
            ['Billing', '128', Receipt],
            ['Inventory', '3,412', Package],
            ['Staff', '46', Users],
          ].map(([l, v, Icon]) => (
            <div className="erp-tile" key={l}>
              <Icon />
              <small>{l}</small>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
        <div className="app__grid">
          <div className="panel panel--dark">
            <div className="panel__head">
              <strong>Revenue vs. expenses</strong>
            </div>
            <div className="dual-bars">
              {[
                [60, 38],
                [72, 44],
                [55, 40],
                [84, 48],
                [78, 46],
                [92, 52],
              ].map(([a, b], i) => (
                <span key={i}>
                  <i style={{ height: `${a}%` }} />
                  <i style={{ height: `${b}%` }} />
                </span>
              ))}
            </div>
          </div>
          <div className="panel panel--dark">
            <div className="panel__head">
              <strong>Stock levels</strong>
            </div>
            <ul className="stock">
              {[
                ['Steel rods', 82],
                ['Packaging', 46],
                ['Paint 20L', 18],
                ['Cement', 64],
              ].map(([n, p]) => (
                <li key={n}>
                  <span>{n}</span>
                  <span className={`meter meter--dark ${p < 25 ? 'is-low' : ''}`}>
                    <i style={{ width: `${p}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WindowChrome>
  )
}

/* ---------------- FlexFlow AI ---------------- */
export function FlexFlowDashboard() {
  const heat = [3, 5, 4, 6, 2, 7, 5, 4, 6, 7, 3, 5, 6, 4, 7, 6, 5, 3, 6, 7, 5, 4, 2, 6, 7, 5, 6, 4]
  return (
    <WindowChrome title="flexflow.ai / studio" className="app--flex">
      <Sidebar items={[LayoutDashboard, Users, CalendarCheck, CreditCard, Dumbbell]} />
      <div className="app__main">
        <div className="app__top">
          <strong className="app__title">Gym performance</strong>
          <span className="ai-chip">
            <Sparkles /> AI insights on
          </span>
        </div>
        <div className="flex-stats">
          <div className="flex-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" className="ring-track" />
              <circle cx="60" cy="60" r="50" className="ring-a" strokeDasharray="314" strokeDashoffset="60" />
              <circle cx="60" cy="60" r="38" className="ring-track" />
              <circle cx="60" cy="60" r="38" className="ring-b" strokeDasharray="239" strokeDashoffset="90" />
            </svg>
            <span>
              <strong>412</strong>
              <small>Active members</small>
            </span>
          </div>
          <div className="flex-legend">
            <span>
              <i className="dot-a" /> Renewed <b>81%</b>
            </span>
            <span>
              <i className="dot-b" /> Check-ins <b>62%</b>
            </span>
            <span className="flex-insight">
              <Sparkles /> Peak hours: 6–8 AM
            </span>
          </div>
        </div>
        <div className="app__grid">
          <div className="panel">
            <div className="panel__head">
              <strong>Attendance</strong>
              <small className="muted">Last 4 weeks</small>
            </div>
            <div className="heat">
              {heat.map((v, i) => (
                <i key={i} style={{ opacity: 0.15 + v * 0.12 }} />
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="panel__head">
              <strong>Billing due</strong>
            </div>
            <ul className="due">
              {[
                ['Rahul K', 'Quarterly', 'Today'],
                ['Anjali M', 'Monthly', 'Tomorrow'],
                ['Fahad S', 'Annual', '3 days'],
              ].map(([n, p, d]) => (
                <li key={n}>
                  <span className="due__avatar">{n[0]}</span>
                  <span>
                    <strong>{n}</strong>
                    <small>{p}</small>
                  </span>
                  <em>{d}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WindowChrome>
  )
}

export function FlexFlowPhone() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__notch" />
      <div className="phone__screen">
        <small className="muted">Member check-in</small>
        <div className="phone__member">
          <span className="due__avatar">A</span>
          <span>
            <strong>Anjali M</strong>
            <small>Gold · Monthly</small>
          </span>
        </div>
        <div className="phone__ok">
          <CheckCircle2 />
          <strong>Checked in</strong>
          <small>06:42 AM</small>
        </div>
        <Bars values={[3, 5, 4, 6, 5, 7, 4]} className="phone__bars" />
        <small className="muted">This week</small>
      </div>
    </div>
  )
}

/* ---------------- Kinetix Payroll ---------------- */
export function PayrollDashboard() {
  const rows = [
    ['Nithin R', 'Sales', 'Processed'],
    ['Fathima S', 'Accounts', 'Processed'],
    ['Joel T', 'Operations', 'Pending'],
    ['Lakshmi P', 'HR', 'Processed'],
  ]
  return (
    <WindowChrome title="kinetix.payroll / run" className="app--pay">
      <Sidebar items={[LayoutDashboard, Users, Fingerprint, Wallet, FileText]} active={3} />
      <div className="app__main">
        <div className="app__top">
          <div>
            <small className="muted">Payroll run</small>
            <strong className="app__title">November cycle</strong>
          </div>
          <span className="pill-btn">
            <Send /> Run payroll
          </span>
        </div>
        <div className="pay-progress">
          <div className="pay-progress__head">
            <span>Processing salaries</span>
            <strong>86%</strong>
          </div>
          <span className="meter meter--lg">
            <i style={{ width: '86%' }} />
          </span>
          <div className="pay-steps">
            {['Attendance', 'Allowances', 'Deductions', 'Payslips'].map((s, i) => (
              <span key={s} className={i < 3 ? 'is-done' : ''}>
                {i < 3 ? <Check /> : <Clock />} {s}
              </span>
            ))}
          </div>
        </div>
        <div className="table">
          <div className="table__row table__row--head">
            <span>Employee</span>
            <span>Department</span>
            <span>Status</span>
          </div>
          {rows.map(([n, d, s]) => (
            <div className="table__row" key={n}>
              <span className="table__emp">
                <span className="due__avatar">{n[0]}</span>
                {n}
              </span>
              <span>{d}</span>
              <span className={`status ${s === 'Pending' ? 'status--pending' : ''}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </WindowChrome>
  )
}

export function Payslip() {
  return (
    <div className="float-card payslip" aria-hidden="true">
      <div className="payslip__head">
        <span>
          <small className="muted">Payslip · Nov</small>
          <strong>Nithin R</strong>
        </span>
        <span className="status">Paid</span>
      </div>
      {[
        ['Basic salary', '32,000'],
        ['Allowances', '6,500'],
        ['Deductions', '− 2,100'],
      ].map(([l, v]) => (
        <div className="payslip__row" key={l}>
          <span>{l}</span>
          <b>₹ {v}</b>
        </div>
      ))}
      <div className="payslip__total">
        <span>Net pay</span>
        <strong>₹ 36,400</strong>
      </div>
    </div>
  )
}

/* ---------------- AI Chatbot ---------------- */
export function ChatWindow({ messages }) {
  return (
    <div className="chat" role="img" aria-label="AI chatbot conversation preview">
      <div className="chat__head" aria-hidden="true">
        <span className="chat__bot">
          <Bot />
        </span>
        <span>
          <strong>Creatif Assistant</strong>
          <small>
            <span className="pulse-dot" /> Online · replies instantly
          </small>
        </span>
      </div>
      <div className="chat__body" aria-hidden="true">
        {messages.map((m, i) => (
          <div key={i} className={`bubble bubble--${m.from}`} data-bubble>
            {m.from === 'bot' && (
              <span className="bubble__avatar">
                <Bot />
              </span>
            )}
            <p>{m.text}</p>
          </div>
        ))}
        <div className="bubble bubble--bot bubble--typing" data-bubble>
          <span className="bubble__avatar">
            <Bot />
          </span>
          <p>
            <span className="typing">
              <span />
              <span />
              <span />
            </span>
          </p>
        </div>
      </div>
      <div className="chat__quick" aria-hidden="true">
        {['Track my order', 'Pricing', 'Talk to a human'].map((q) => (
          <span key={q}>{q}</span>
        ))}
      </div>
      <div className="chat__input" aria-hidden="true">
        <MessageSquare />
        <span>Type your message…</span>
        <span className="chat__send">
          <Send />
        </span>
      </div>
    </div>
  )
}
