import api from "@/services/api";
import { ICocktail } from "@/types/coktail";
import CocktailForm from "@/components/coktailForm";
import Link from "next/link";

interface EditPageProps {
  params: { id: string };
}

async function getCocktailToEdit(id: string): Promise<ICocktail | null> {
  try {
    const response = await api.get<ICocktail>(`/cocktails/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function EditCocktailPage({ params }: EditPageProps) {
  const { id } = await params;
  const cocktail = await getCocktailToEdit(id);

  if (!cocktail) {
    return (
      <main className="min-h-screen p-8 bg-linear-to-b from-accent/30 to-white flex flex-col items-center justify-center">
        <p className="text-xl text-danger font-bold mb-4">Cóctel no encontrado</p>
        <Link href="/" className="text-primary hover:underline">Volver al inicio</Link>
      </main>
    );
  }
  
  const { id: numericId, ...initialData } = cocktail; 

  return (
    <main className="min-h-screen p-4 md:p-8 bg-linear-to-b from-accent/30 to-white flex items-center justify-center">
      <CocktailForm initialData={initialData} cocktailId={numericId} />
    </main>
  );
}