'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { ICocktailPayload } from '@/types/coktail';
// Importamos iconos para los inputs
import { Type, GlassWater, FileText, Image as ImageIcon, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CocktailFormProps {
  initialData?: ICocktailPayload;
  cocktailId?: number;
}

export default function CocktailForm({ initialData, cocktailId }: CocktailFormProps) {
  const router = useRouter();
  const isEditing = !!cocktailId;
  
  const [formData, setFormData] = useState<ICocktailPayload>(
    initialData || {
      nombre: '',
      ingredientes: '',
      instrucciones: '',
      fotoUrl: '',
    }
  );
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await api.put(`/cocktails/${cocktailId}`, formData);
      } else {
        await api.post('/cocktails', formData);
      }
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(`Hubo un error al ${isEditing ? 'guardar' : 'crear'} el cóctel.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Botón Volver pequeño arriba */}
      <div className="mb-6">
        <Link href="/" className="text-sm text-lightText hover:text-primary flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Volver al menú
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-soft-xl border border-gray-100">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary tracking-tight">
            {isEditing ? 'Editar Receta' : 'Nueva Receta'}
            </h2>
            <p className="text-lightText text-sm mt-2">
            {isEditing ? 'Modifica los detalles de tu cóctel' : 'Comparte tu nueva creación con el mundo'}
            </p>
        </div>
        
        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-danger rounded-xl text-sm flex items-center gap-2">
                <span className="font-bold">Error:</span> {error}
            </div>
        )}

        <div className="space-y-5">
            {/* Campo Nombre */}
            <div>
                <label className="block text-darkText font-semibold text-sm mb-2 ml-1">Nombre del Cóctel</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Type className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                    type="text" 
                    name="nombre" 
                    placeholder="Ej: Margarita Blue"
                    value={formData.nombre} 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-darkText" 
                    required 
                    />
                </div>
            </div>

            {/* Campo Ingredientes */}
            <div>
                <label className="block text-darkText font-semibold text-sm mb-2 ml-1">Ingredientes</label>
                <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <GlassWater className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea 
                    name="ingredientes" 
                    placeholder="Ej: 2oz Tequila, 1oz Limón, Sal..."
                    value={formData.ingredientes} 
                    onChange={handleChange} 
                    rows={3}
                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-darkText resize-none" 
                    required 
                    />
                </div>
            </div>

            {/* Campo Instrucciones */}
            <div>
                <label className="block text-darkText font-semibold text-sm mb-2 ml-1">Instrucciones de Preparación</label>
                <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea 
                    name="instrucciones" 
                    placeholder="Ej: Mezclar todo en una coctelera con hielo..."
                    value={formData.instrucciones} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-darkText resize-none" 
                    required 
                    />
                </div>
            </div>

            {/* Campo Foto URL */}
            <div>
                <label className="block text-darkText font-semibold text-sm mb-2 ml-1">URL de la Imagen</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                    type="url" 
                    name="fotoUrl" 
                    placeholder="https://..."
                    value={formData.fotoUrl} 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-darkText" 
                    required 
                    />
                </div>
            </div>
        </div>

        {/* Botón de Envío */}
        <div className="mt-8">
            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white p-4 rounded-xl font-bold shadow-soft-lg hover:bg-secondary transition-all duration-300 transform hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Guardando...
                    </>
                ) : (
                    <>
                        <Save className="h-5 w-5" />
                        {isEditing ? 'Guardar Cambios' : 'Crear Cóctel'}
                    </>
                )}
            </button>
        </div>
      </form>
    </div>
  );
}