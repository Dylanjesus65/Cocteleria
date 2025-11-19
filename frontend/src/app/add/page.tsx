import CocktailForm from "@/components/coktailForm";

export default function AddCocktailPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-linear-to-b from-accent/30 to-white flex items-center justify-center">
      <CocktailForm />
    </main>
  );
}