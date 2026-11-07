import { CheckSquare, Calendar, Briefcase, BookOpen, Home, Plus } from 'lucide-react'

export default function TareasPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Título de la sección */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Módulo de Tareas 🌸</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
          <Plus className="size-4" /> Nueva Tarea
        </button>
      </div>

      {/* Bloque Superior: Del Día, Categorías y Progreso */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card: Del Día */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm border-blue-100 dark:border-blue-900/40">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="size-5 text-blue-500" />
            <h2 className="font-semibold">Del Día</h2>
          </div>
          <p className="text-3xl font-bold">3 <span className="text-sm font-normal text-muted-foreground">pendientes</span></p>
          <p className="text-xs text-muted-foreground mt-2">Enfócate en lo principal de hoy ✨</p>
        </div>

        {/* Card: Categorías */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-2">
          <h2 className="font-semibold text-sm text-muted-foreground mb-3">Categorías</h2>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <Briefcase className="size-3.5" /> Trabajo
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              <BookOpen className="size-3.5" /> Estudio
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
              <Home className="size-3.5" /> Casa / Personal
            </span>
          </div>
        </div>

        {/* Card: Progreso */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-sm text-muted-foreground">Progreso Global</h2>
            <p className="text-2xl font-bold mt-1">75%</p>
            <p className="text-xs text-muted-foreground">¡Casi completas el día!</p>
          </div>
          <div className="relative flex items-center justify-center size-16 rounded-full border-4 border-purple-200 border-t-purple-500 font-bold text-sm">
            75%
          </div>
        </div>
      </div>

      {/* Bloque Inferior: Detalle de Tareas */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Detalle de Tareas</h2>
        <div className="divide-y">
          {/* Tarea 1 */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="size-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <div>
                <p className="font-medium text-sm">Repasar boceto de Bloom</p>
                <p className="text-xs text-muted-foreground">Lun 25 • Estudio</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 text-purple-600 dark:bg-purple-950/40">83%</span>
          </div>

          {/* Tarea 2 */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="size-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <div>
                <p className="font-medium text-sm">Organizar agenda semanal</p>
                <p className="text-xs text-muted-foreground">Lun 25 • Personal</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40">70%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
