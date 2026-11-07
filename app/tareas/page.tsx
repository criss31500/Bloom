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

        {/* Tarjetas individuales de Categorías */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Tarjeta Trabajo */}
  <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3">
    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
      <Briefcase className="size-5" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">Categoría</p>
      <p className="text-sm font-semibold">Trabajo</p>
    </div>
  </div>

  {/* Tarjeta Estudio */}
  <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3">
    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
      <BookOpen className="size-5" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">Categoría</p>
      <p className="text-sm font-semibold">Estudio</p>
    </div>
  </div>

  {/* Tarjeta Personal */}
  <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3">
    <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
      <Home className="size-5" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">Categoría</p>
      <p className="text-sm font-semibold">Casa / Personal</p>
    </div>
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
