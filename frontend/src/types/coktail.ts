// src/types/cocktail.ts

// Esta interfaz (I) define la estructura de datos para un cóctel
export interface ICocktail {
  id: number;
  nombre: string;
  ingredientes: string;
  instrucciones: string;
  fotoUrl: string;
  // Añadimos una propiedad opcional para favoritos (que usaremos más tarde con localStorage)
  isFavorite?: boolean; 
}

// Interfaz para la data de creación/edición (no lleva ID)
export interface ICocktailPayload {
  nombre: string;
  ingredientes: string;
  instrucciones: string;
  fotoUrl: string;
}