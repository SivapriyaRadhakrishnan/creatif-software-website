import {
  Zap,
  Clock4,
  Headphones,
  Globe2,
  MessageCircleQuestion,
  BrainCircuit,
  MessageSquareText,
  UserRound,
  Bot,
  Sparkles,
} from 'lucide-react'
import Page from '../components/Page'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import { ChatWindow } from '../components/mockups/Dashboards'
import { ServiceHero, StatementIntro, FeatureCards } from '../sections/service/ServiceSections'
import { useScrollAnimations, gsap } from '../animations/scrollAnimations'

const heroMessages = [
  { from: 'user', text: 'Hi! Is my order out for delivery?' },
  { from: 'bot', text: 'Hi there! 👋 Yes, order #2048 is on its way and should reach you today.' },
  { from: 'user', text: 'Great! Can I change the delivery time?' },
]

const features = [
  { icon: Zap, title: 'Instant Answers', text: 'Respond to common customer questions in seconds, not hours.' },
  { icon: Clock4, title: 'Anytime Availability', text: 'Support customers around the clock, even outside business hours.' },
  { icon: Headphones, title: 'Customer Support', text: 'Resolve routine queries automatically and free up your team.' },
  { icon: Globe2, title: 'Anywhere Access', text: 'Stay connected with customers wherever they reach you.' },
]

const flow = [
  { icon: MessageCircleQuestion, title: 'Customer asks', text: 'A question arrives, any time of day.' },
  { icon: BrainCircuit, title: 'AI understands', text: 'The chatbot interprets what the customer needs.' },
  { icon: MessageSquareText, title: 'Instant reply', text: 'A helpful, accurate answer is sent right away.' },
  { icon: UserRound, title: 'Team hand-off', text: 'Complex requests are passed to your team.' },
]

function HeroChat() {
  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const bubbles = scope.querySelectorAll('[data-bubble]')
    gsap.from(bubbles, {
      y: 24,
      opacity: 0,
      scale: 0.92,
      transformOrigin: (i, el) => (el.classList.contains('bubble--user') ? '100% 100%' : '0% 100%'),
      duration: 0.6,
      stagger: 0.75,
      delay: 1,
      ease: 'back.out(1.6)',
    })
  })
  return (
    <div className="chat-visual" ref={ref}>
      <ChatWindow messages={heroMessages} />
      <div className="svc-hero__float chat-visual__stat" aria-hidden="true">
        <span className="float-card__icon">
          <Sparkles />
        </span>
        <span>
          <small>Conversations</small>
          <strong>Handled automatically</strong>
        </span>
      </div>
      <div className="svc-hero__float chat-visual__bot" aria-hidden="true">
        <Bot />
      </div>
    </div>
  )
}

function ConversationFlow() {
  const ref = useScrollAnimations(({ motion }, scope) => {
    if (!motion) return
    const q = gsap.utils.selector(scope)
    const tl = gsap.timeline({ scrollTrigger: { trigger: q('.flowline')[0], start: 'top 75%', once: true } })
    q('.flowline__step').forEach((step, i) => {
      tl.from(step, { y: 40, opacity: 0, duration: 0.7, ease: 'expo.out' }, i * 0.18)
      const conn = step.querySelector('.flowline__conn i')
      if (conn) tl.fromTo(conn, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, i * 0.18 + 0.3)
    })
  })

  return (
    <section className="section section--dark ai-why" ref={ref}>
      <div className="bg-grid" aria-hidden="true" />
      <span className="orb orb--red ai-why__orb" aria-hidden="true" />
      <div className="container z-1">
        <SectionHeading
          eyebrow="WHY AI CHATBOT"
          title="Always On. Always *Helpful.*"
          description="Your customers expect quick answers. An AI chatbot responds instantly, handles routine questions, and keeps your business connected, anytime, anywhere."
          align="center"
        />
        <ol className="flowline">
          {flow.map(({ icon: Icon, title, text }, i) => (
            <li className="flowline__step" key={title}>
              <span className="flowline__icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="flowline__n">0{i + 1}</span>
              <h3 className="h3">{title}</h3>
              <p>{text}</p>
              {i < flow.length - 1 && (
                <span className="flowline__conn" aria-hidden="true">
                  <i />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function AIChatbot() {
  return (
    <Page
      title="AI Chatbot"
      description="Automate customer conversations with Creatif's intelligent AI chatbot that answers questions, supports customers and keeps your business connected, anytime, anywhere."
      className="page--chatbot"
    >
      <ServiceHero
        eyebrow="AI CHATBOT"
        title={'Smarter Conversations.\nBetter Customer *Experiences.*'}
        description="Automate customer conversations with an intelligent AI chatbot that answers questions, supports your customers, and helps your business stay connected — anytime, anywhere."
        cta="Build Smarter. Grow Faster"
        layout="split"
        visual={<HeroChat />}
      />

      <StatementIntro
        label="INTRODUCTION"
        text="We combine smart technology with practical solutions to simplify business operations, improve efficiency, and help teams work better every day."
      />

      <FeatureCards
        eyebrow="CAPABILITIES"
        title="An Assistant That Never *Clocks Out*"
        items={features}
        columns={4}
        tone="soft"
      />

      <ConversationFlow />

      <CTASection
        eyebrow="AI CHATBOT"
        title="Build Smarter. Grow *Faster.*"
        description="Give your customers instant answers and your team more time. Let’s build your AI chatbot."
        button="Build Smarter. Grow Faster"
      />
    </Page>
  )
}
