'use client';

import { useState } from 'react';

interface SkinImageProps {
  skinId: number;
  nick: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SkinImage({ skinId, nick, className = '', style }: SkinImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log('SkinImage recebido - skinId:', skinId, 'nick:', nick);
  
  const skinUrl = `https://assets.open.mp/assets/images/skins/${skinId}.png`;
  console.log('URL gerada:', skinUrl);

  const handleError = () => {
    console.log('Erro ao carregar skin:', skinUrl);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('Skin carregada com sucesso:', skinUrl);
    setIsLoading(false);
    setHasError(false);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
            <span className="material-icons text-gray-400 text-xl">person</span>
          </div>
          <p className="text-gray-400 text-xs">Skin {skinId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
        <img
          src={skinUrl}
          alt={`Skin ${skinId} de ${nick}`}
          className="w-full h-full object-contain rounded-lg"
          onError={handleError}
          onLoad={handleLoad}
          style={{ 
            display: isLoading ? 'none' : 'block',
            ...style
          }}
        />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mb-1 mx-auto">
              <span className="material-icons text-gray-400 text-sm">person</span>
            </div>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-starling-500 mx-auto"></div>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-1 mx-auto">
              <span className="material-icons text-gray-400 text-sm">person</span>
            </div>
            <p className="text-gray-400 text-xs">Skin {skinId}</p>
          </div>
        </div>
      )}
    </div>
  );
}
