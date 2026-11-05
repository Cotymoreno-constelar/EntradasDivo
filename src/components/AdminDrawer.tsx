import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VirtualTicket } from '../types';
import { VirtualTicketCard } from './VirtualTicketCard';
import { X, Download, Search, Ticket, RotateCcw, Eye } from 'lucide-react';

export const AdminDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { tickets, exportTicketsCSV, resetDemoData } = useApp();
  const [search, setSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<VirtualTicket | null>(null);

  if (!isOpen) return null;

  const filteredTickets = tickets.filter((t) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.clientName.toLowerCase().includes(q) ||
      t.orderNumber.toLowerCase().includes(q) ||
      t.ticketCode.toLowerCase().includes(q) ||
      t.playTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Ticket className="w-4 h-4" />
              <span>Registro de Entradas Virtuales Canjeadas</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Historial de Canjes Carlos Paz 2027
            </h3>
            <p className="text-xs text-zinc-400">
              Total emitidas: {tickets.length} entradas de cortesía Divo Trajes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedTicket ? (
          <div className="mt-6">
            <button
              onClick={() => setSelectedTicket(null)}
              className="mb-4 text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              ← Volver al listado
            </button>
            <VirtualTicketCard
              ticket={selectedTicket}
              onReset={() => setSelectedTicket(null)}
            />
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cliente, pedido o código..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={exportTicketsCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar CSV</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('¿Reiniciar el registro de prueba?')) {
                      resetDemoData();
                    }
                  }}
                  title="Reiniciar datos demo"
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-semibold uppercase">
                    <th className="py-2.5 px-3">Código</th>
                    <th className="py-2.5 px-3">Cliente</th>
                    <th className="py-2.5 px-3">N° Pedido</th>
                    <th className="py-2.5 px-3">Monto</th>
                    <th className="py-2.5 px-3">Obra Seleccionada</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500">
                        No hay entradas que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((t) => (
                      <tr key={t.id} className="hover:bg-zinc-900/50">
                        <td className="py-3 px-3 font-mono font-bold text-amber-300">
                          {t.ticketCode}
                        </td>
                        <td className="py-3 px-3 font-semibold text-white">
                          {t.clientName}
                          <div className="text-[10px] text-zinc-500 font-normal">{t.clientPhone}</div>
                        </td>
                        <td className="py-3 px-3 font-mono text-amber-400">
                          #{t.orderNumber}
                        </td>
                        <td className="py-3 px-3 text-emerald-400 font-semibold">
                          ${t.orderAmount.toLocaleString('es-AR')}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-white">{t.playTitle}</div>
                          <div className="text-[10px] text-zinc-400">{t.theater}</div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setSelectedTicket(t)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver Entrada</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
