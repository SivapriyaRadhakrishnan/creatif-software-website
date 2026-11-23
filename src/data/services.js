import { Users, Boxes, Dumbbell, Wallet, Bot } from 'lucide-react'

/**
 * The five Creatif products. `cardDescription` is the homepage card copy as
 * supplied in the brief.
 */
export const services = [
  {
    slug: 'crm',
    path: '/services/crm',
    name: 'CRM Software',
    cardTitle: 'CRM Solutions',
    navLabel: 'CRM Software',
    navHint: 'Leads, customers & follow-ups',
    icon: Users,
    visual: 'crm',
    cardDescription:
      'Build stronger relationships, track leads and manage customers with smart CRM solutions.',
  },
  {
    slug: 'erp',
    path: '/services/erp',
    name: 'ERP Software',
    cardTitle: 'ERP Software',
    navLabel: 'ERP Software',
    navHint: 'Sales, billing, inventory & staff',
    icon: Boxes,
    visual: 'erp',
    cardDescription:
      'Connect and automate your core business operations with powerful ERP software.',
  },
  {
    slug: 'flexflow-ai',
    path: '/services/flexflow-ai',
    name: 'FlexFlow AI',
    cardTitle: 'FlexFlow AI',
    navLabel: 'FlexFlow AI',
    navHint: 'AI-powered fitness management',
    icon: Dumbbell,
    visual: 'flexflow',
    // NOTE: supplied card copy describes invoicing, while the FlexFlow page
    // describes fitness management. Review before launch.
    cardDescription:
      'Create, manage and track invoices while making your billing process faster and easier.',
  },
  {
    slug: 'kinetix-payroll',
    path: '/services/kinetix-payroll',
    name: 'Kinetix Payroll System',
    cardTitle: 'Kinetix Payroll System',
    navLabel: 'Kinetix Payroll',
    navHint: 'Salaries, attendance & HR',
    icon: Wallet,
    visual: 'payroll',
    cardDescription:
      'Manage employees, attendance and payroll efficiently with streamlined HR software.',
  },
  {
    slug: 'ai-chatbot',
    path: '/services/ai-chatbot',
    name: 'AI Chatbot',
    cardTitle: 'AI Chatbot',
    navLabel: 'AI Chatbot',
    navHint: 'Automated customer conversations',
    icon: Bot,
    visual: 'chatbot',
    // NOTE: supplied card copy describes a point-of-sale system, while the
    // AI Chatbot page describes conversational AI. Review before launch.
    cardDescription:
      'Power your sales with a reliable point-of-sale system built for modern businesses.',
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
