import React from 'react';
import { useApp } from '../context/AppContext';
import { Ticket, Download, RotateCcw } from 'lucide-react';

export const Header: React.FC<{
  onOpenAdmin: () => void;
}> = ({ onOpenAdmin }) => {
  const { tickets, exportTicketsCSV, resetDemoData } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-amber-500/20 bg-zinc-950/95 backdrop-blur-md">
      {/* Top micro ribbon */}
      <div className="bg-gradient-to-r from-zinc-950 via-amber-950/40 to-zinc-950 border-b border-amber-500/10 px-4 py-1 text-[11px] text-amber-200/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>TEMPORADA TEATRAL VILLA CARLOS PAZ 2027 • DIVO TRAJES</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400">
            <span>📍 Av. Libertad 340, Carlos Paz</span>
            <span>📞 03541-438900</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-[1px] shadow-lg shadow-amber-900/30">
            <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center">
              <span className="font-serif font-black text-lg text-amber-300 tracking-tighter">
                DT
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-widest text-white uppercase font-serif">
                Divo Trajes
              </h1>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Canje Carlos Paz '27
              </span>
            </div>
            <p className="text-[11px] text-amber-200/60 font-light">
              Canje Oficial de Entradas Teatrales por Alquiler
            </p>
          </div>
        </div>

        {/* Discreet Tools for store management */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportTicketsCSV}
            title="Exportar listado de entradas a Excel / CSV"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-500/40 text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>CSV Canjes ({tickets.length})</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-medium transition-colors cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            <span>Entradas Emitidas ({tickets.length})</span>
          </button>
        </div>

      </div>
    </header>
  );
};
