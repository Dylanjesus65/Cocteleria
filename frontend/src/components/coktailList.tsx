// src/components/CocktailList.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { ICocktail } from '@/types/coktail';
import Link from 'next/link';

interface CocktailListProps {
  initialCocktails: ICocktail[];
}

export default function CocktailList({ initialCocktails }: CocktailListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]); // Array de IDs favoritos

  // 1. Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('cocktail_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // 2. Función para guardar/eliminar favoritos
  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault(); // Evita que el Link se active (no queremos ir al detalle)
    e.stopPropagation(); // Detiene la propagación del evento

    let newFavorites;
    if (favorites.includes(id)) {
      // Si ya es favorito, lo quitamos
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      // Si no es favorito, lo agregamos
      newFavorites = [...favorites, id];
    }

    setFavorites(newFavorites);
    localStorage.setItem('cocktail_favorites', JSON.stringify(newFavorites));
  };

  // Lógica de filtrado (Buscador)
  const filteredCocktails = initialCocktails.filter(cocktail =>
    cocktail.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cocktail.ingredientes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Buscar por nombre o ingrediente..."
        className="w-full p-3 mb-8 border border-gray-300 rounded-lg shadow-md focus:ring-indigo-500 focus:border-indigo-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Menú de Cócteles ({filteredCocktails.length} encontrados)
      </h1>

      {filteredCocktails.length === 0 && initialCocktails.length > 0 ? (
          <p className="text-center text-red-500 font-semibold">
            No se encontraron cócteles con ese criterio de búsqueda.
          </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCocktails.map((cocktail) => {
            // Verificamos si este cóctel es favorito
            const isFav = favorites.includes(cocktail.id);

            return (
              <Link 
                key={cocktail.id} 
                href={`/cocktail/${cocktail.id}`} 
                passHref
              >
                <div className="bg-white p-4 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer h-full relative">
                  
                  {/* BOTÓN DE FAVORITOS (CORAZÓN) */}
                  <button
                    onClick={(e) => toggleFavorite(e, cocktail.id)}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-sm z-10 transition-colors ${
                      isFav ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:text-red-400'
                    }`}
                    title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <h2 className="text-xl font-bold text-indigo-700 pr-8">{cocktail.nombre}</h2>
                  <img src={cocktail.fotoUrl} alt={cocktail.nombre} className="w-full h-32 object-cover my-3 rounded" />
                  <p className="text-sm text-gray-600 truncate">Ingredientes: {cocktail.ingredientes}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}