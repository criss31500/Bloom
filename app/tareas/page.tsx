'use client'

import { useState } from 'react'
import { Calendar, Briefcase, BookOpen, Home, Plus, X } from 'lucide-react'

// Definimos la estructura de una Tarea
interface Task {
  id: number
  title: string
  category: 'Trabajo' | 'Estudio' | 'Personal'
  completed: boolean
  progress: string
}

export default function TareasPage() {
  // Lista inicial de tareas (las que ya tenías)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Repasar boceto de Bloom', category: 'Estudio', completed: false, progress: '83%' },
    { id: 2, title: 'Organizar agenda semanal', category: 'Personal', completed: false, progress: '70%' },
  ])

  // Estado para controlar si el formulario de nueva tarea está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Estados para los campos del formulario
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<'Trabajo' | 'Estudio' | 'Personal'>('Trabajo')

  // Función para alternar el estado de completado de una tarea
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // Función para agregar una nueva tarea
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newTask: Task = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      completed: false,
      progress: '50%'
    }

    setTasks([newTask, ...tasks])
    setNewTitle('')
    setIsModalOpen(false)
  }

  // Calculamos pendientes de manera dinámica
  const pendingCount = tasks.filter(t => !t.completed).length

  return (
    <div className="space-y-6 max-w-6xl mx-auto relative">
      {/* Título de la sección */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Módulo de Tareas 🌸</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm"
        >
          <Plus className="size-4" /> Nueva Tarea
        </button>
      </div>

      {/* Bloque Superior: Del Día y Progreso */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Card: Del Día */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm border-blue-100 dark:border-blue-900/40">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="size-5 text-blue-500" />
            <h2 className="font-semibold">Del Día</h2>
          </div>
          <p className="text-3xl font-bold">{pendingCount} <span className="text-sm font-normal text-muted-foreground">pendientes</span></p>
          <p className="text-xs text-muted-foreground mt-2">Enfócate en lo principal de hoy ✨</p>
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

      {/* Sección de Categorías en Fila Horizontal */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta Trabajo */}
          <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3 hover:border-blue-500/50 transition">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Briefcase className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Trabajo</p>
              <p className="text-xs text-muted-foreground">1 pendiente</p>
            </div>
          </div>

          {/* Tarjeta Estudio */}
          <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3 hover:border-purple-500/50 transition">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <BookOpen className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Estudio</p>
              <p className="text-xs text-muted-foreground">1 pendiente</p>
            </div>
          </div>

          {/* Tarjeta Personal */}
          <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3 hover:border-pink-500/50 transition">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
              <Home className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Casa / Personal</p>
              <p className="text-xs text-muted-foreground">1 pendiente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque Inferior: Detalle de Tareas */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Detalle de Tareas</h2>
        <div className="divide-y">
          {tasks.map((task) => (
            <div key={task.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="size-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" 
                />
                <div>
                  <p className={`font-medium text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground">Lun 25 • {task.category}</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 text-purple-600 dark:bg-purple-950/40">
                {task.progress}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Formulario para Nueva Tarea */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4 relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Crear Nueva Tarea ✨</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Título de la tarea</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Diseñar la base de datos..."
                  className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Categoría</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Trabajo">Trabajo</option>
                  <option value="Estudio">Estudio</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium border hover:bg-muted transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Guardar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
