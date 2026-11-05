import React, { useRef, useState } from 'react';
import { VirtualTicket } from '../types';
import html2canvas from 'html2canvas';
import {
  Download,
  Share2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Calendar,
  User,
  ShoppingBag,
  ArrowLeft,
  Ticket
} from 'lucide-react';

interface Props {
  ticket: VirtualTicket;
  onReset: () => void;
}

export const VirtualTicketCard: React.FC<Props> = ({ ticket, onReset }) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    setDownloadSuccess(false);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2.5, // Crisp high-res for mobile & desktop
        backgroundColor: '#0c0c0e',
        useCORS: true,
        logging: false,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Entrada_${ticket.clientName.replace(/\s+/g, '_')}_${ticket.ticketCode}.png`;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error al generar la entrada:', err);
      alert('Hubo un problema al descargar la imagen. Podés hacer captura de pantalla.');
    } finally {
      setDownloading(false);
    }
  };

  const shareText = `¡Hola! Ya tengo mi entrada oficial de Divo Trajes para "${ticket.playTitle}" en el ${ticket.theater} (Carlos Paz 2027). A nombre de: ${ticket.clientName} (Código: ${ticket.ticketCode}).`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="w-full max-w-2xl mx-auto py-6 animate-in fade-in duration-300">
      
      {/* Top Banner Alert */}
      <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-white">
              ¡Entrada generada con éxito, {ticket.clientName.split(' ')[0]}!
            </h4>
            <p className="text-xs text-emerald-300/80">
              Tu entrada personalizada ya está lista para descargar y presentar en la sala.
            </p>
          </div>
        </div>
      </div>

      {/* TICKET CONTAINER (DOM element for html2canvas) */}
      <div
        ref={ticketRef}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181f] via-[#121217] to-[#0a0a0d] border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl text-white gold-glow"
      >
        {/* Decorative Top Gold Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600" />

        {/* Watermark / Brand Header */}
        <div className="flex items-start justify-between pb-6 border-b border-dashed border-amber-500/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-extrabold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ENTRADA OFICIAL DE CORTESÍA • TEMPORADA 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-widest gold-text-gradient">
              DIVO TRAJES
            </h2>
            <p className="text-xs text-zinc-400 font-light tracking-wide">
              Atelier de Alta Costura • Villa Carlos Paz, Córdoba
            </p>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
              Código de Entrada
            </div>
            <div className="font-mono text-lg sm:text-xl font-black text-amber-400 tracking-wider">
              {ticket.ticketCode}
            </div>
            <div className="mt-1 inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold">
              VÁLIDA PARA INGRESO
            </div>
          </div>
        </div>

        {/* Theater Play Main Title */}
        <div className="py-6 border-b border-zinc-800">
          <div className="text-xs text-amber-400/90 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1.5">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span>Espectáculo Seleccionado</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
            {ticket.playTitle}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {ticket.genre}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-950/70 p-3.5 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white">{ticket.theater}</span>
                <span className="block text-[11px] text-zinc-400">{ticket.theaterAddress}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-300">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Funciones 2027</span>
                <span className="block text-[11px] text-zinc-400">{ticket.schedule}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Customer Data Section */}
        <div className="py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-zinc-800">
          <div>
            <div className="text-[11px] text-zinc-400 flex items-center gap-1 mb-1">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Titular / Espectador</span>
            </div>
            <div className="font-bold text-sm text-white capitalize">
              {ticket.clientName}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-zinc-400 flex items-center gap-1 mb-1">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>N° de Pedido</span>
            </div>
            <div className="font-bold text-sm text-amber-300 font-mono">
              #{ticket.orderNumber}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-zinc-400 mb-1">Teléfono</div>
            <div className="font-medium text-zinc-300">
              {ticket.clientPhone}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-zinc-400 mb-1">Monto Alquiler</div>
            <div className="font-black text-amber-400 text-sm">
              ${ticket.orderAmount.toLocaleString('es-AR')}
            </div>
          </div>
        </div>

        {/* Assigned Seat / Location */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-zinc-400 text-[11px] block">Sector Asignado:</span>
            <span className="text-amber-300 font-bold text-sm">
              {ticket.seatCategory}
            </span>
          </div>

          <div className="text-right text-[11px] text-zinc-500">
            Emitida el {new Date(ticket.issuedAt).toLocaleDateString('es-AR')} • Divo Trajes VCP
          </div>
        </div>

        {/* Notice */}
        <div className="mt-4 pt-3 border-t border-zinc-900 text-center text-[10px] text-zinc-400">
          * Presentá esta entrada digital o impresa en la boletería del teatro con tu DNI. Beneficio exclusivo de Divo Trajes.
        </div>
      </div>

      {/* ACTION BUTTONS (Outside download canvas) */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-5 h-5 text-black" />
          <span>
            {downloading
              ? 'Generando imagen...'
              : downloadSuccess
              ? '¡Descargada con éxito!'
              : 'DESCARGAR ENTRADA (PNG)'}
          </span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>Compartir</span>
        </a>

        <button
          onClick={onReset}
          className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Canjear Otra</span>
        </button>
      </div>

    </div>
  );
};
