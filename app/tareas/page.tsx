'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, Briefcase, BookOpen, Home, Plus, X, Repeat, CheckSquare } from 'lucide-react'

interface SubTask {
  id: number
  text: string
  completed: boolean
}

interface Task {
  id: number
  title: string
  category: 'Trabajo' | 'Estudio' | 'Personal'
  dueDate: string
  isRecurring: boolean
  repeatDays: string[] // Días seleccionados (ej: ['Martes', 'Viernes'])
  syncToAgenda: boolean // Sincronizado con la agenda personal
  subtasks: SubTask[]
  completed: boolean
}

export default function TareasPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: 'Repasar boceto de Bloom', 
      category: 'Estudio', 
      dueDate: '2026-11-25', 
      isRecurring: true, 
      repeatDays: ['Jueves'],
      syncToAgenda: true,
      completed: false,
      subtasks: [
        { id: 101, text: 'Definir paleta de colores', completed: true },
        { id: 102, text: 'Revisar componentes de UI', completed: false }
      ]
    },
    { 
      id: 2, 
      title: 'Organizar agenda semanal', 
      category: 'Personal', 
      dueDate: '2026-11-25', 
      isRecurring: false, 
      repeatDays: [],
      syncToAgenda: true,
      completed: false,
      subtasks: [
        { id: 201, text: 'Anotar reuniones clave', completed: true },
        { id: 202, text: 'Verificar recordatorios de Supabase', completed: false }
      ]
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Estados del formulario
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<'Trabajo' | 'Estudio' | 'Personal'>('Trabajo')
  const [newDueDate, setNewDueDate] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [syncToAgenda, setSyncToAgenda] = useState(true)
  
  const [subtasksInput, setSubtasksInput] = useState<string[]>([''])

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  const handleAddSubtaskField = () => {
    setSubtasksInput([...subtasksInput, ''])
  }

  const handleSubtaskInputChange = (index: number, value: string) => {
    const updated = [...subtasksInput]
    updated[index] = value
    setSubtasksInput(updated)
  }

  const toggleSubtask = (taskId: number, subId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubs = task.subtasks.map(sub => 
          sub.id === subId ? { ...sub, completed: !sub.completed } : sub
        )
        return { ...task, subtasks: updatedSubs }
      }
      return task
    }))
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const formattedSubtasks: SubTask[] = subtasksInput
      .filter(text => text.trim() !== '')
      .map((text, idx) => ({
        id: Date.now() + idx,
        text,
        completed: false
      }))

    const newTask: Task = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      dueDate: newDueDate || 'Sin fecha',
      isRecurring,
      repeatDays: isRecurring ? selectedDays : [],
      syncToAgenda,
      subtasks: formattedSubtasks,
      completed: false
    }

    setTasks([newTask, ...tasks])
    setNewTitle('')
    setNewDueDate('')
    setIsRecurring(false)
    setSelectedDays([])
    setSyncToAgenda(true)
    setSubtasksInput([''])
    setIsModalOpen(false)
  }

  const pendingCount = tasks.filter(t => !t.completed).length

  return (
    <div className="space-y-6 max-w-6xl mx-auto relative">
      {/* Título */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Módulo de Tareas 🌸</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm"
        >
          <Plus className="size-4" /> Nueva Tarea
        </button>
      </div>

      {/* Bloque Superior */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-sm border-blue-100 dark:border-blue-900/40">
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon className="size-5 text-blue-500" />
            <h2 className="font-semibold">Del Día</h2>
          </div>
          <p className="text-3xl font-bold">{pendingCount} <span className="text-sm font-normal text-muted-foreground">pendientes</span></p>
          <p className="text-xs text-muted-foreground mt-2">Enfócate en lo principal de hoy ✨</p>
        </div>

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

      {/* Categorías */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"><Briefcase className="size-5" /></div>
            <div><p className="text-sm font-semibold">Trabajo</p><p className="text-xs text-muted-foreground">1 pendiente</p></div>
          </div>
          <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400"><BookOpen className="size-5" /></div>
            <div><p className="text-sm font-semibold">Estudio</p><p className="text-xs text-muted-foreground">1 pendiente</p></div>
          </div>
          <div className="rounded-2xl border bg-card p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400"><Home className="size-5" /></div>
            <div><p className="text-sm font-semibold">Casa / Personal</p><p className="text-xs text-muted-foreground">1 pendiente</p></div>
          </div>
        </div>
      </div>

      {/* Detalle de Tareas */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6">
        <h2 className="font-semibold text-lg">Detalle de Tareas</h2>
        <div className="space-y-4">
          {tasks.map((task) => {
            const completedSubs = task.subtasks.filter(s => s.completed).length
            const totalSubs = task.subtasks.length
            const progressPercentage = totalSubs > 0 ? Math.round((completedSubs / totalSubs) * 100) : 0

            return (
              <div key={task.id} className="p-4 rounded-xl border bg-background/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5 flex-wrap">
                      <span>📅 {task.dueDate}</span> • <span>{task.category}</span>
                      {task.isRecurring && task.repeatDays.length > 0 && (
                        <span className="flex items-center gap-1 text-purple-500 font-medium">
                          <Repeat className="size-3" /> Repite: {task.repeatDays.join(', ')}
                        </span>
                      )}
                      {task.syncToAgenda && (
                        <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded text-[10px] font-semibold">
                          📅 En Agenda Personal
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 text-purple-600 dark:bg-purple-950/40">
                    {progressPercentage}%
                  </span>
                </div>

                {task.subtasks.length > 0 && (
                  <div className="pl-2 space-y-1.5 pt-2 border-t border-border/50">
                    {task.subtasks.map((sub) => (
                      <label key={sub.id} className="flex items-center gap-2.5 text-xs cursor-pointer text-muted-foreground hover:text-foreground transition">
                        <input 
                          type="checkbox" 
                          checked={sub.completed}
                          onChange={() => toggleSubtask(task.id, sub.id)}
                          className="size-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className={sub.completed ? 'line-through opacity-70' : ''}>{sub.text}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal / Formulario Mejorado */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4 relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
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
                  placeholder="Ej. Revisar contrato..."
                  className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
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

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Fecha límite</label>
                  <input 
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Selección de Días Específicos de Repetición */}
              <div className="space-y-2 pt-2 border-t">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input 
                    type="checkbox" 
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 size-4"
                  />
                  <span className="font-medium text-xs text-muted-foreground flex items-center gap-1">
                    <Repeat className="size-3.5" /> ¿Repetir en días específicos?
                  </span>
                </label>

                {isRecurring && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {daysOfWeek.map((day) => {
                      const isSelected = selectedDays.includes(day)
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDaySelection(day)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                            isSelected 
                              ? 'bg-purple-500 text-white shadow-sm' 
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Opción de Sincronización con Agenda Personal */}
              <div className="pt-2 border-t">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input 
                    type="checkbox" 
                    checked={syncToAgenda}
                    onChange={(e) => setSyncToAgenda(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 size-4"
                  />
                  <span className="font-medium text-xs text-muted-foreground">
                    📅 Sincronizar automáticamente con la Agenda Personal
                  </span>
                </label>
              </div>

              {/* Subtareas */}
              <div className="space-y-2 pt-2 border-t">
                <label className="text-xs font-medium text-muted-foreground block">Pasos o Checks para completar</label>
                {subtasksInput.map((subText, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text"
                      value={subText}
                      onChange={(e) => handleSubtaskInputChange(index, e.target.value)}
                      placeholder={`Paso ${index + 1}`}
                      className="w-full rounded-xl border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={handleAddSubtaskField}
                  className="text-xs text-purple-500 hover:underline font-medium pt-1 block"
                >
                  + Añadir otro paso
                </button>
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
