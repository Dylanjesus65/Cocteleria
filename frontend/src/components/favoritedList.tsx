'use client';

import React, { useState, useEffect } from 'react';
import { ICocktail } from '@/types/coktail';
import Link from 'next/link';
import { Heart, HeartCrack, ArrowRight, GlassWater } from 'lucide-react';

export default function FavoritesList({ allCocktails }: { allCocktails: ICocktail[] }) {
  const [favoriteCocktails, setFavoriteCocktails] = useState<ICocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Leemos los IDs del localStorage
    const savedIds = JSON.parse(localStorage.getItem('cocktail_favorites') || '[]');
    
    // 2. Filtramos la lista completa para dejar solo los favoritos
    const filtered = allCocktails.filter(c => savedIds.includes(c.id));
    
    setFavoriteCocktails(filtered);
    setLoading(false);
  }, [allCocktails]);

  // Función para quitar de favoritos desde esta pantalla
  const removeFavorite = (e: React.MouseEvent, idToRemove: number) => {
    e.preventDefault(); // Evitamos ir al detalle
    e.stopPropagation();

    // Actualizamos visualmente
    const newList = favoriteCocktails.filter(c => c.id !== idToRemove);
    setFavoriteCocktails(newList);

    // Actualizamos localStorage
    const currentIds = JSON.parse(localStorage.getItem('cocktail_favorites') || '[]');
    const newIds = currentIds.filter((id: number) => id !== idToRemove);
    localStorage.setItem('cocktail_favorites', JSON.stringify(newIds));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-lightText animate-pulse">Cargando tus favoritos...</p>
      </div>
    );
  }

  // ESTADO VACÍO (Sin favoritos)
  if (favoriteCocktails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-soft-lg border border-gray-100 text-center max-w-2xl mx-auto">
        <div className="bg-red-50 p-6 rounded-full mb-6">
            <HeartCrack size={64} className="text-danger/60" />
        </div>
        <h2 className="text-2xl font-bold text-darkText mb-2">
          Aún no tienes favoritos
        </h2>
        <p className="text-lightText mb-8 max-w-md">
          Explora nuestro menú y dale clic al corazón ❤️ en los cócteles que más te gusten para guardarlos aquí.
        </p>
        <Link 
            href="/" 
            className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-soft-lg hover:translate-y-[-2px]"
        >
          Ir al Menú <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  // GRID DE FAVORITOS
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {favoriteCocktails.map((cocktail) => (
        <div
            key={cocktail.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                    src={cocktail.fotoUrl || "/placeholder.svg"}
                    alt={cocktail.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Botón QUITAR Favorito */}
                <button
                    onClick={(e) => removeFavorite(e, cocktail.id)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white transition-all shadow-md backdrop-blur-sm transform hover:scale-110 active:scale-95 group/btn"
                    title="Quitar de favoritos"
                >
                    {/* Usamos fill-danger para que se vea rojo sólido */}
                    <Heart
                        size={20}
                        className="fill-danger text-danger group-hover/btn:scale-90 transition-transform"
                    />
                </button>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col grow">
                <h3 className="text-xl font-bold text-darkText mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                    {cocktail.nombre}
                </h3>
                
                <div className="grow mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg flex gap-3 items-start">
                        <GlassWater size={16} className="text-primary/70 mt-0.5 shrink-0" />
                        <p className="text-xs text-lightText line-clamp-2 leading-relaxed">
                            {cocktail.ingredientes}
                        </p>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <Link
                        href={`/cocktail/${cocktail.id}`}
                        className="block w-full py-2.5 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-xl transition-colors text-sm font-bold text-center uppercase tracking-wide"
                    >
                        Ver Detalles
                    </Link>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}