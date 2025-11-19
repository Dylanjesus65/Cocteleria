import api from "@/services/api";
import { ICocktail } from "@/types/coktail"; 
import Link from 'next/link'; 
// Importamos componentes e iconos
import DeleteButton from "@/components/deleteButtom";
import { ArrowLeft, Edit2, GlassWater, ChefHat, LayoutList } from 'lucide-react';

interface DetailPageProps {
  params: { id: string };
}

async function getCocktailDetail(id: string): Promise<ICocktail | null> {
  try {
    const response = await api.get<ICocktail>(`/cocktails/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function CocktailDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const cocktail = await getCocktailDetail(id);

  if (!cocktail) {
    return (
      <main className="min-h-screen p-8 bg-linear-to-b from-accent/30 to-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-darkText mb-2">Cóctel no encontrado 😕</h1>
        <Link href="/" className="text-primary hover:underline font-medium">
          Volver al menú principal
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-accent/30 to-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Botón Volver */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-lightText hover:text-primary mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Volver al listado
        </Link>

        {/* Tarjeta Principal */}
        <div className="bg-white rounded-3xl shadow-soft-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            
            {/* Columna Izquierda: Imagen Hero */}
            <div className="md:w-1/2 relative h-96 md:h-auto bg-gray-100">
              {cocktail.fotoUrl ? (
                <img
                  src={cocktail.fotoUrl}
                  alt={cocktail.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                   <GlassWater size={64} />
                </div>
              )}
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r"></div>
            </div>

            {/* Columna Derecha: Información */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-darkText mb-6 tracking-tight leading-tight">
                {cocktail.nombre}
              </h1>

              <div className="space-y-8 grow">
                
                {/* Sección Ingredientes */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <GlassWater className="text-primary" size={24} />
                    <h3 className="text-lg font-bold text-darkText">Ingredientes</h3>
                  </div>
                  <p className="text-lightText leading-relaxed text-lg">
                    {cocktail.ingredientes}
                  </p>
                </div>

                {/* Sección Instrucciones */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ChefHat className="text-primary" size={24} />
                    <h3 className="text-lg font-bold text-darkText">Preparación</h3>
                  </div>
                  <p className="text-darkText leading-loose text-lg pl-2 border-l-4 border-primary/20">
                    {cocktail.instrucciones}
                  </p>
                </div>

              </div>

              {/* Footer de Acciones */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                <Link href={`/edit/${cocktail.id}`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white p-3.5 rounded-xl font-bold hover:bg-secondary transition-all shadow-soft-lg hover:translate-y-[-2px]">
                    <Edit2 size={18} />
                    Editar Receta
                  </button>
                </Link>

                <div className="w-full md:w-auto">
                   {/* Envolvemos el delete button para darle estilo */}
                   <div className="w-full md:w-40">
                      <DeleteButton id={cocktail.id} />
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}