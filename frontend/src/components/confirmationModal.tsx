'use client';

import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: ConfirmationModalProps) {
  
  if (!isOpen) return null;

  return (
    // 1. El Fondo (Backdrop) oscuro y desenfocado
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      
      {/* 2. La Tarjeta del Modal */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100 border border-gray-100">
        
        {/* Header con icono de alerta */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="text-danger h-6 w-6" />
          </div>
          
          <h3 className="text-xl font-bold text-darkText mb-2">
            {title}
          </h3>
          
          <p className="text-lightText text-sm">
            {message}
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-darkText border border-gray-200 rounded-lg hover:bg-gray-100 font-medium transition-colors text-sm shadow-sm"
          >
            Cancelar
          </button>
          
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-700 font-medium transition-colors text-sm shadow-md flex items-center gap-2"
          >
            <span>Sí, eliminar</span>
          </button>
        </div>

        {/* Botón cerrar esquina */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
            <X size={20} />
        </button>
      </div>
    </div>
  );
}