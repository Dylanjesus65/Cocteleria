'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
// Importamos iconos profesionales de Lucide
import { 
  Heart, 
  Plus, 
  Edit2, 
  Search, 
  Frown, 
  Trash2, 
  Martini, // Para el logo
  GlassWater // Para los ingredientes
} from 'lucide-react'
import { ICocktail } from '@/types/coktail'
import api from '@/services/api'
import ConfirmationModal from '@/components/confirmationModal'

export default function CocktailsPage() {
  const router = useRouter()
  const [cocktails, setCocktails] = useState<ICocktail[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])

  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cocktailToDelete, setCocktailToDelete] = useState<number | null>(null)

  // 1. Cargar favoritos
  useEffect(() => {
    const saved = localStorage.getItem('cocktail_favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // 2. Cargar cócteles
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        setLoading(true)
        const res = await api.get('/cocktails')
        setCocktails(res.data)
      } catch (error) {
        console.error('Error fetching cocktails:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCocktails()
  }, [])

  // 3. Filtrado
  const filtered = cocktails.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.ingredientes.toLowerCase().includes(search.toLowerCase())
  )

  // 4. Toggle Favorito
  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id]
    
    setFavorites(updated)
    localStorage.setItem('cocktail_favorites', JSON.stringify(updated))
  }

  // 5. Abrir Modal de Eliminar
  const promptDelete = (id: number) => {
    setCocktailToDelete(id);
    setIsModalOpen(true);
  }

  // 6. Confirmar Eliminación
  const confirmDelete = async () => {
    if (!cocktailToDelete) return;

    try {
      await api.delete(`/cocktails/${cocktailToDelete}`);
      
      setCocktails(prev => prev.filter(c => c.id !== cocktailToDelete));
      if (favorites.includes(cocktailToDelete)) {
         const newFavs = favorites.filter(fav => fav !== cocktailToDelete);
         setFavorites(newFavs);
         localStorage.setItem('cocktail_favorites', JSON.stringify(newFavs));
      }
      
      setIsModalOpen(false);
      setCocktailToDelete(null);

    } catch (error) {
      console.error("Error al eliminar", error);
      alert("Ocurrió un error al intentar eliminar.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-accent/30 to-white font-sans text-darkText relative">
      
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="¿Eliminar cóctel?"
        message="Esta acción no se puede deshacer. El cóctel se borrará permanentemente."
      />

      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            
            {/* LOGO / TÍTULO (Sin Emojis) */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Martini className="text-primary h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary tracking-tight">
                  Cocteles App
                </h1>
                <p className="text-lightText text-xs font-medium">
                  Gestor de Recetas
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/favorites"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-danger border border-danger/20 rounded-full hover:bg-danger hover:text-white transition-all shadow-sm font-medium group text-sm"
              >
                <Heart size={16} className="group-hover:fill-white transition-colors" />
                <span>Favoritos</span>
              </Link>
              <Link
                href="/add"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full hover:bg-secondary transition-all shadow-soft-lg transform hover:scale-105 font-medium text-sm"
              >
                <Plus size={16} />
                <span>Nuevo</span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto md:mx-0 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-darkText placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm text-sm"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-lightText animate-pulse text-sm">Cargando contenido...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
                <Frown size={48} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-darkText mb-2">No encontramos resultados</h2>
            <p className="text-lightText mb-6 text-sm">Intenta ajustar tu búsqueda.</p>
            {search && (
                <button onClick={() => setSearch('')} className="text-primary font-semibold hover:underline text-sm">Limpiar filtros</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((cocktail) => (
              <div
                key={cocktail.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={cocktail.fotoUrl || "/placeholder.svg"}
                    alt={cocktail.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={(e) => toggleFavorite(e, cocktail.id)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white transition-all shadow-md backdrop-blur-sm transform hover:scale-110 active:scale-95"
                  >
                    <Heart
                      size={18}
                      className={favorites.includes(cocktail.id) ? 'fill-danger text-danger' : 'text-gray-400'}
                    />
                  </button>
                </div>

                <div className="p-5 flex flex-col grow">
                  <h3 className="text-lg font-bold text-darkText mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                    {cocktail.nombre}
                  </h3>
                  
                  <div className="grow mb-4">
                     {/* INGREDIENTES: Sin emoji, con icono limpio */}
                     <div className="bg-gray-50 p-3 rounded-lg flex gap-3 items-start">
                        <GlassWater size={16} className="text-primary/70 mt-0.5 shrink-0" />
                        <p className="text-xs text-lightText line-clamp-2 leading-relaxed">
                           {cocktail.ingredientes}
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                    <Link
                      href={`/cocktail/${cocktail.id}`}
                      className="flex-1 py-2 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors text-xs font-bold flex items-center justify-center uppercase tracking-wide"
                    >
                      Detalles
                    </Link>
                    
                    <Link
                      href={`/edit/${cocktail.id}`}
                      className="px-3 py-2 bg-gray-100 text-lightText hover:bg-gray-200 hover:text-darkText rounded-lg transition-colors flex items-center justify-center"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </Link>

                    <button
                      onClick={() => promptDelete(cocktail.id)}
                      className="px-3 py-2 bg-red-50 text-danger hover:bg-danger hover:text-white rounded-lg transition-colors flex items-center justify-center"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}