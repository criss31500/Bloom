'use client'

import { useState, useEffect } from 'react'
import { Briefcase, BookOpen, Home, Heart, Star, Sparkles, Trash2, Edit2, Check, X, Plus, Tag, ChevronDown, ChevronUp } from 'lucide-react'

interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export default function AjustesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Trabajo', color: 'bg-blue-500/10 text-blue-600 border-blue-200', icon: 'Briefcase' },
    { id: '2', name: 'Estudio', color: 'bg-purple-500/10 text-purple-600 border-purple-200', icon: 'BookOpen' },
    { id: '3', name: 'Personal', color: 'bg-pink-500/10 text-pink-600 border-pink-200', icon: 'Heart' },
    { id: '4', name: 'Salud', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', icon: 'Sparkles' },
    { id: '5', name: 'Hogar', color: 'bg-amber-500/10 text-amber-600 border-amber-200', icon: 'Home' },
  ])

  // Estado para abrir/cerrar el menú desplegable de categorías
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)

  // Cargar categorías guardadas al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('bloom_categories')
    if (saved) {
      try {
        setCategories(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Guardar y sincronizar categorías cada vez que cambien
  const saveAndSyncCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories)
    localStorage.setItem('bloom_categories', JSON.stringify(updatedCategories))
  }

  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedColor, setSelectedColor] = useState('bg-purple-500/10 text-purple-600 border-purple-200')
  const [selectedIcon, setSelectedIcon] = useState('Tag')
  
  // Estado para editar
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editColor, setEditColor] = useState('')

  const colorOptions = [
    { name: 'Morado', value: 'bg-purple-500/10 text-purple-600 border-purple-200', dot: 'bg-purple-500' },
    { name: 'Azul', value: 'bg-blue-500/10 text-blue-600 border-blue-200', dot: 'bg-blue-500' },
    { name: 'Rosa', value: 'bg-pink-500/10 text-pink-600 border-pink-200', dot: 'bg-pink-500' },
    { name: 'Verde', value: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500' },
    { name: 'Amarillo', value: 'bg-amber-500/10 text-amber-600 border-amber-200', dot: 'bg-amber-500' },
  ]

  const iconOptions = ['Briefcase', 'BookOpen', 'Home', 'Heart', 'Star', 'Sparkles', 'Tag']

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="size-4" />
      case 'BookOpen': return <BookOpen className="size-4" />
      case 'Home': return <Home className="size-4" />
      case 'Heart': return <Heart className="size-4" />
      case 'Star': return <Star className="size-4" />
      case 'Sparkles': return <Sparkles className="size-4" />
      default: return <Tag className="size-4" />
    }
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    const newCat: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      color: selectedColor,
      icon: selectedIcon
    }

    saveAndSyncCategories([...categories, newCat])
    setNewCategoryName('')
  }

  const handleDeleteCategory = (id: string) => {
    saveAndSyncCategories(categories.filter(c => c.id !== id))
  }

  const startEditing = (cat: Category) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditColor(cat.color)
  }

  const saveEditing = (id: string) => {
    const updated = categories.map(c => c.id === id ? { ...c, name: editName, color: editColor } : c)
    saveAndSyncCategories(updated)
    setEditingId(null)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ajustes de Bloom 🌸</h1>
        <p className="text-sm text-muted-foreground mt-1">Personaliza tus categorías, colores y espacio personal.</p>
      </div>

      {/* Gestión de Categorías Plegable */}
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <button 
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted/30 transition text-left"
        >
          <div className="flex items-center gap-3">
            <Tag className="size-5 text-purple-500" />
            <div>
              <h2 className="font-semibold text-lg">Gestión de Categorías</h2>
              <p className="text-xs text-muted-foreground">Personaliza y sincroniza tus etiquetas para Agenda y Tareas.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/40">
              {categories.length} activas
            </span>
            {isCategoriesOpen ? <ChevronUp className="size-5 text-muted-foreground" /> : <ChevronDown className="size-5 text-muted-foreground" />}
          </div>
        </button>

        {isCategoriesOpen && (
          <div className="p-6 pt-0 space-y-6 border-t">
            {/* Formulario Añadir */}
            <form onSubmit={handleAddCategory} className="space-y-4 bg-muted/30 p-4 rounded-xl border mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Añadir nueva categoría</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)} 
                  placeholder="Ej. Proyectos, Ejercicio..." 
                  className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                />
                <button 
                  type="submit" 
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm"
                >
                  <Plus className="size-4" /> Agregar
                </button>
              </div>

              {/* Selector de color */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-medium text-muted-foreground">Color:</span>
                <div className="flex gap-2">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSelectedColor(opt.value)}
                      className={`size-6 rounded-full ${opt.dot} transition-transform ${selectedColor === opt.value ? 'scale-125 ring-2 ring-offset-2 ring-purple-500' : 'opacity-70 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Selector de icono */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-medium text-muted-foreground">Icono:</span>
                <div className="flex gap-2 flex-wrap">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-2 rounded-xl border transition ${selectedIcon === icon ? 'bg-purple-600 text-white border-purple-600' : 'bg-background hover:bg-muted text-muted-foreground'}`}
                    >
                      {renderIcon(icon)}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* Lista de Categorías con opción de Editar y Borrar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3.5 rounded-xl border bg-background shadow-sm">
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <input 
                        type="text" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)} 
                        className="w-full rounded-lg border bg-background px-2.5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500" 
                        autoFocus
                      />
                      <button onClick={() => saveEditing(cat.id)} className="p-1.5 rounded-lg bg-emerald-500 text-white hover:opacity-90">
                        <Check className="size-3.5" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg border text-muted-foreground hover:bg-muted">
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${cat.color}`}>
                          {renderIcon(cat.icon)}
                        </div>
                        <span className="font-medium text-sm">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => startEditing(cat)} 
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
                          title="Editar categoría"
                        >
                          <Edit2 className="size-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)} 
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                          title="Eliminar categoría"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mascota / Compañero Bloom */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          Mascota o Compañero Bloom 🐾
        </h2>
        <p className="text-sm text-muted-foreground">
          Próximamente aquí podrás adoptar un pequeño compañero o flor virtual que te acompañará mientras organizas tus días y cumples tus tareas. ¡Espéralo muy pronto! ✨
        </p>
      </div>
    </div>
  )
}
