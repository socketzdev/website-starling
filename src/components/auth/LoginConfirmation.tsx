'use client';

import { SkinImage } from '@/components/ui/SkinImage';

interface UserData {
  id: number;
  nick: string;
  moedas: number;
  dinheiro: number;
  level: number;
  admin: number;
  vip: number;
  socio: number;
  skin: number;
  lastLogin: number;
  since: number;
}

interface LoginConfirmationProps {
  userData: UserData;
  onContinue: () => void;
  onClose: () => void;
}

export function LoginConfirmation({ userData, onContinue, onClose }: LoginConfirmationProps) {
  const getStatusBadges = () => {
    const badges = [];
    
    if (userData.admin > 0) {
      badges.push(
        <span key="admin" className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          ADMIN
        </span>
      );
    }
    
    if (userData.socio > 0) {
      badges.push(
        <span key="socio" className="bg-starling-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          SÓCIO
        </span>
      );
    }
    
    if (userData.vip > 0) {
      badges.push(
        <span key="vip" className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          VIP
        </span>
      );
    }

    return badges;
  };

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-black border border-gray-600/40 rounded-2xl w-full max-w-lg h-[650px] shadow-2xl overflow-y-auto">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-starling-600/10 to-transparent rounded-full blur-[60px]"></div>
          <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-gradient-to-tl from-purple-600/10 to-transparent rounded-full blur-[40px]"></div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
        >
          <span className="material-icons text-xl">close</span>
        </button>

        {/* Header */}
        <div className="relative z-10 text-center p-4 pb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-starling-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-icons text-white text-xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">CONFIRMAÇÃO DE CONTA</h2>
          <p className="text-gray-400 text-xs">Bem-vindo ao Starling RPG</p>
        </div>

        {/* Player Info */}
        <div className="relative z-10 px-4 pt-12 pb-4">
          {/* Player Name */}
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-white">Olá, {userData.nick}</h3>
            <div className="flex justify-center gap-1 mt-1">
              {getStatusBadges()}
            </div>
          </div>

          {/* Skin Display */}
          <div className="flex justify-center mb-3">
            <div className="relative w-36 h-48">
              <SkinImage 
                skinId={userData.skin} 
                nick={userData.nick}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Player Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
            <div className="text-center">
              <div className="text-gray-400">Level</div>
              <div className="text-starling-400 font-bold">{userData.level}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Moedas</div>
              <div className="text-green-400 font-bold">{userData.moedas.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Dinheiro</div>
              <div className="text-green-400 font-bold">${userData.dinheiro.toLocaleString()}</div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="relative z-10 w-full bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] text-sm mb-2"
          >
            <span className="material-icons text-sm">arrow_forward</span>
            CONTINUAR
          </button>

          {/* Não é você? */}
          <p
            onClick={onClose}
            className="relative z-10 text-center text-gray-400 text-sm cursor-pointer hover:text-white transition-colors"
          >
            Não é você?
          </p>
        </div>
      </div>
    </div>
  );
}
