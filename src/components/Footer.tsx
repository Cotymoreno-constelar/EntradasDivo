import React from 'react';
import { MapPin, Phone, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-amber-500/10 bg-zinc-950 text-zinc-500 text-xs py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-serif font-bold text-sm">
            <span className="text-amber-400">DIVO TRAJES</span>
            <span className="text-zinc-600">•</span>
            <span>Carlos Paz 2027</span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Av. Libertad 340, Villa Carlos Paz, Córdoba</span>
          </p>
        </div>

        <div className="text-[11px] text-zinc-400">
          <p className="flex items-center justify-center sm:justify-end gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Consultas y Guardia de Elencos: 03541-438900</span>
          </p>
          <p className="text-zinc-500 mt-0.5">
            © 2027 Divo Trajes. Canje de Entradas Teatrales Oficiales.
          </p>
        </div>
      </div>
    </footer>
  );
};
