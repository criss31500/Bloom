import { CalendarDays, Wallet, CheckSquare, Settings, type LucideIcon } from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  shortLabel: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Finanzas', shortLabel: 'Finanzas', icon: Wallet },
  { href: '/agenda', label: 'Agenda semanal', shortLabel: 'Agenda', icon: CalendarDays },
  { href: '/tareas', label: 'Tareas', shortLabel: 'Tareas', icon: CheckSquare },
  { href: '/ajustes', label: 'Ajustes', shortLabel: 'Ajustes', icon: Settings },
]
