import api from "@/services/api";
import { ICocktail } from "@/types/coktail";
import FavoritesList from "@/components/favoritedList";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

// Obtenemos todos los cócteles del servidor
async function getAllCocktails(): Promise<ICocktail[]> {
  try {
    const response = await api.get<ICocktail[]>('/cocktails');
    return response.data;
  } catch (error) {
    console.error("Error al obtener cócteles", error);
    return [];
  }
}

export default async function FavoritesPage() {
  const allCocktails = await getAllCocktails();

  return (
    <main className="min-h-screen bg-linear-to-b from-accent/30 to-white font-sans text-darkText">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header de Favoritos */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
                <Link href="/" className="inline-flex items-center gap-2 text-lightText hover:text-primary mb-2 transition-colors text-sm font-medium">
                    <ArrowLeft size={16} /> Volver al menú
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-danger/10 rounded-xl">
                        <Heart className="text-primary fill-primary" size={28} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-darkText tracking-tight">
                        Mi Colección
                    </h1>
                </div>
            </div>
        </div>

        {/* Lista de Favoritos */}
        <FavoritesList allCocktails={allCocktails} />
        
      </div>
    </main>
  );
}