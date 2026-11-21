'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  BookOpen,
  Home,
  Heart,
  Star,
  Sparkles,
  Tag,
  CheckSquare,
  Calendar,
  Wallet,
  Flower2,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'

interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Trabajo', color: 'bg-blue-500/10 text-blue-600 border-blue-200', icon: 'Briefcase' },
    { id: '2', name: 'Estudio', color: 'bg-purple-500/10 text-purple-600 border-purple-200', icon: 'BookOpen' },
    { id: '3', name: 'Personal', color: 'bg-pink-500/10 text-pink-600 border-pink-200', icon: 'Heart' },
    { id: '4', name: 'Salud', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', icon: 'Sparkles' },
    { id: '5', name: 'Hogar', color: 'bg-amber-500/10 text-amber-600 border-amber-200', icon: 'Home' },
  ])

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Cargar categorías personalizadas desde Ajustes
  useEffect(() => {
    const saved = localStorage.getItem('bloom_categories')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed)
          setSelectedCategory(parsed[0])
          return
        }
      } catch (e) {
        console.error(e)
      }
    }
    setSelectedCategory({
      id: '1',
      name: 'Trabajo',
      color: 'bg-blue-500/10 text-blue-600 border-blue-200',
      icon: 'Briefcase',
    })
  }, [])

  const renderIcon = (iconName: string, className = 'size-5') => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className={className} />
      case 'BookOpen':
        return <BookOpen className={className} />
      case 'Home':
        return <Home className={className} />
      case 'Heart':
        return <Heart className={className} />
      case 'Star':
        return <Star className={className} />
      case 'Sparkles':
        return <Sparkles className={className} />
      default:
        return <Tag className={className} />
    }
  }

  // Datos de ejemplo por categoría para previsualizar el resumen de Módulos
  const getModuleSummary = (categoryName: string) => {
    const key = categoryName.toLowerCase()
    if (key.includes('trabajo')) {
      return {
        tareas: ['Revisar cronograma de limpiezas', 'Confirmar inventario de lencería'],
        agenda: ['Reunión operativa — 10:00 AM', 'Cierre de reportes — 05:00 PM'],
        finanzas: ['Presupuesto insumos: $120.000', 'Gasto registrado: $35.000'],
      }
    }
    if (key.includes('estudio')) {
      return {
        tareas: ['Repasar componentes de React', 'Practicar diseño pastel en Bloom'],
        agenda: ['Bloque de código — 02:00 PM'],
        finanzas: ['Suscripción herramientas: $15.000'],
      }
    }
    return {
      tareas: [`Pendiente principal de ${categoryName}`, `Organizar semana (${categoryName})`],
      agenda: [`Bloque reservado para ${categoryName}`],
      finanzas: ['Sin gastos recientes registrados'],
    }
  }

  const weekDays = [
    { day: 'L', status: '2 tareas' },
    { day: 'M', status: '1 evento' },
    { day: 'M', status: '3 tareas' },
    { day: 'J', status: 'Al día' },
    { day: 'V', status: '2 tareas' },
  ]

  const currentSummary = selectedCategory ? getModuleSummary(selectedCategory.name) : null

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Encabezado / Saludo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 p-6 rounded-3xl border border-purple-200/50 dark:border-purple-900/40">
        <div>
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Flower2 className="size-4" /> Bloom • Espacio Personal
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Buen día, Criss ✨
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Hoy es un lindo día para avanzar a tu ritmo. Elige una categoría para ver tus módulos.
          </p>
        </div>

        {/* Widget de Mascota / Flor */}
        <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-2xl border shadow-sm self-start md:self-auto">
          <div className="size-11 rounded-2xl bg-pink-500/15 text-pink-500 flex items-center justify-center">
            <Flower2 className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold">Tu Loto Bloom</p>
            <p className="text-[11px] text-muted-foreground">Floreciendo contigo 🌸</p>
          </div>
        </div>
      </div>

      {/* Zona Superior: Categorías a la izquierda + Resumen Semana y Finanzas a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Selector de Categorías */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Categorías
            </h2>
            <Link href="/ajustes" className="text-xs text-purple-600 hover:underline font-medium">
              Personalizar
            </Link>
          </div>

          <div className="space-y-2.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory?.id === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition text-left ${
                    isSelected
                      ? 'bg-card border-purple-400 ring-2 ring-purple-500/20 shadow-md'
                      : 'bg-card/70 hover:bg-card border-border shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                      {renderIcon(cat.icon, 'size-5')}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Ver tareas, agenda y finanzas
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform ${
                      isSelected ? 'rotate-180 text-purple-600' : ''
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Columna Derecha: Resumen de Finanzas + Semana */}
        <div className="lg:col-span-7 space-y-6">
          {/* Widget Módulo Finanzas */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
                <Wallet className="size-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Módulo Finanzas • Balance General</p>
                <p className="text-xl font-bold mt-0.5">Todo en orden ✨</p>
                <p className="text-xs text-muted-foreground mt-0.5">Consulta tus gastos por categoría abajo</p>
              </div>
            </div>
            <Link
              href="/finanzas"
              className="text-xs font-medium px-3 py-2 rounded-xl border hover:bg-muted transition flex items-center gap-1"
            >
              Abrir <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Resumen de la Semana (L M M J V) */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">Semana (Resumen)</h2>
              <Link href="/agenda" className="text-xs text-purple-600 hover:underline font-medium">
                Ver agenda completa
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {weekDays.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border bg-background/60 p-3 text-center space-y-1.5"
                >
                  <span className="inline-flex items-center justify-center size-7 rounded-full bg-purple-500/10 text-purple-600 font-bold text-xs">
                    {item.day}
                  </span>
                  <p className="text-[11px] text-muted-foreground font-medium">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zona Inferior Desplegable: Módulos filtrados por la Categoría seleccionada */}
      {selectedCategory && currentSummary && (
        <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${selectedCategory.color}`}>
                {renderIcon(selectedCategory.icon, 'size-5')}
              </div>
              <div>
                <h2 className="text-lg font-bold">{selectedCategory.name}</h2>
                <p className="text-xs text-muted-foreground">
                  Resumen de todos los módulos vinculados a esta categoría
                </p>
              </div>
            </div>
          </div>

          {/* 3 Columnas de Módulos: Tareas, Agenda y Dinero/Finanzas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Módulo Tareas */}
            <div className="rounded-2xl border bg-background/60 p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold text-sm text-purple-600">
                    <CheckSquare className="size-4" /> Tareas
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 font-medium">
                    {currentSummary.tareas.length}
                  </span>
                </div>
                <ul className="space-y-2">
                  {currentSummary.tareas.map((item, i) => (
                    <li key={i} className="text-xs p-2.5 rounded-xl bg-card border text-foreground/90">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/tareas"
                className="text-xs text-purple-600 font-medium hover:underline pt-2 inline-flex items-center gap-1"
              >
                Ir al módulo Tareas <ArrowRight className="size-3" />
              </Link>
            </div>

            {/* Módulo Agenda */}
            <div className="rounded-2xl border bg-background/60 p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold text-sm text-blue-600">
                    <Calendar className="size-4" /> Agenda
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-medium">
                    {currentSummary.agenda.length}
                  </span>
                </div>
                <ul className="space-y-2">
                  {currentSummary.agenda.map((item, i) => (
                    <li key={i} className="text-xs p-2.5 rounded-xl bg-card border text-foreground/90">
                      📅 {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/agenda"
                className="text-xs text-blue-600 font-medium hover:underline pt-2 inline-flex items-center gap-1"
              >
                Ir al módulo Agenda <ArrowRight className="size-3" />
              </Link>
            </div>

            {/* Módulo Dinero / Finanzas */}
            <div className="rounded-2xl border bg-background/60 p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold text-sm text-emerald-600">
                    <Wallet className="size-4" /> Dinero / Finanzas
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                    Activo
                  </span>
                </div>
                <ul className="space-y-2">
                  {currentSummary.finanzas.map((item, i) => (
                    <li key={i} className="text-xs p-2.5 rounded-xl bg-card border text-foreground/90">
                      💰 {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/finanzas"
                className="text-xs text-emerald-600 font-medium hover:underline pt-2 inline-flex items-center gap-1"
              >
                Ir al módulo Finanzas <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
