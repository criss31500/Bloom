'use client'

import { useState } from 'react'
import { Settings, Plus, Trash2, Tag, Heart, Sparkles, Briefcase, BookOpen, Home, Activity, ShieldCheck } from 'lucide-react'

interface Category {
  id: string
  name: string
  color: string
  iconName: string
}

export default function AjustesPage() {
  // Lista inicial unificada con las categorías que usas en Tareas y Agenda
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Trabajo', color: 'bg-blue-500/10 text-blue-600 border-blue-200', iconName: 'Briefcase' },
    { id: '2', name: 'Estudio', color: 'bg-purple-500/10 text-purple-600 border-purple-200', iconName: 'BookOpen' },
    { id: '3', name: 'Personal', color: 'bg-pink-500/10 text-pink-600 border-pink-200', iconName: 'Home' },
    { id: '4', name: 'Salud', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', iconName: 'Activity' },
    { id: '5', name: 'Hogar', color: 'bg-amber-500/10 text-amber-600 border-amber-200', iconName: 'ShieldCheck' },
  ])

  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedColor, setSelectedColor] = useState('bg-purple-500/10 text-purple-600 border-purple-200')

  // Colores pastel disponibles para elegir
  const pastelColors = [
    { name: 'Morado Bloom', class: 'bg-purple-500/10 text-purple-600 border-purple-200' },
    { name: 'Azul cielo', class: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    { name: 'Rosa tierno', class: 'bg-pink-500/10 text-pink-600 border-pink-200' },
    { name: 'Verde menta', class: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
    { name: 'Amarillo pastel', class: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  ]

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    const newCat: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      color: selectedColor,
      iconName: 'Tag'
    }

    setCategories([...categories, newCat])
    setNewCategoryName('')
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id))
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Título de la sección */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="size-6 text-purple-500" /> Ajustes de Bloom 🌸
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Personaliza tus categorías, colores y espacio personal.</p>
        </div>
      </div>

      {/* Sección 1: Gestión de Categorías unificadas */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Tag className="size-5 text-purple-500" /> Gestión de Categorías
            </h2>
            <p className="text-xs text-muted-foreground">Estas categorías aplican tanto para tu Agenda como para tus Tareas.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/40">
            {categories.length} activas
          </span>
        </div>

        {/* Formulario para crear categoría */}
        <form onSubmit={handleAddCategory} className="space-y-4 bg-muted/30 p-4 rounded-xl border">
          <p className="text-xs font-semibold">Añadir nueva categoría</p>
          <div className="flex gap-2">
            <input 
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Ej. Proyectos, Ejercicio..."
              className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              type="submit"
              className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shrink-0"
            >
              <Plus className="size-4" /> Agregar
            </button>
          </div>

          {/* Selector de color pastel */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground">Color:</span>
            {pastelColors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.class)}
                className={`size-6 rounded-full border-2 transition ${c.class.split(' ')[0]} ${selectedColor === c.class ? 'ring-2 ring-purple-500 scale-110' : 'opacity-70'}`}
                title={c.name}
              />
            ))}
          </div>
        </form>

        {/* Lista de categorías existentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-3 rounded-xl border bg-background shadow-2xs">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${cat.color}`}>
                  <Tag className="size-4" />
                </div>
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
              <button 
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-muted-foreground hover:text-red-500 p-1.5 rounded-lg hover:bg-muted transition"
                title="Eliminar categoría"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección 2: Espacio reservado para la Mascota / Decoración */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4 border-purple-200/60 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-yellow-500/5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-purple-500" />
          <h2 className="font-semibold text-lg">Mascota o Compañero Bloom 🐾</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Próximamente aquí podrás adoptar un pequeño compañero o flor virtual que te acompañará mientras organizas tus días y cumples tus tareas. ¡Espéralo muy pronto! ✨
        </p>
      </div>
    </div>
  )
}
