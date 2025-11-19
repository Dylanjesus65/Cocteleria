'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este cóctel?')) return;

    setLoading(true);
    try {
      await api.delete(`/cocktails/${id}`);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al eliminar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-red-50 text-danger border border-red-100 p-3.5 rounded-xl font-bold hover:bg-danger hover:text-white transition-all hover:shadow-lg disabled:opacity-50"
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
      {loading ? 'Borrando...' : 'Eliminar'}
    </button>
  );
}