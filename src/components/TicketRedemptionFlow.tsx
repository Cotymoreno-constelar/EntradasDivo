import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClientExchangeForm, TheaterPlayOption, VirtualTicket } from '../types';
import { VirtualTicketCard } from './VirtualTicketCard';
import confetti from 'canvas-confetti';
import {
  Ticket,
  User,
  Phone,
  ShoppingBag,
  DollarSign,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const TicketRedemptionFlow: React.FC = () => {
  const { plays, createVirtualTicket } = useApp();

  // Navigation steps: 'intro' | 'form' | 'plays' | 'ticket'
  const [step, setStep] = useState<'intro' | 'form' | 'plays' | 'ticket'>('intro');

  // The 4 required fields
  const [formData, setFormData] = useState<ClientExchangeForm>({
    clientName: '',
    clientPhone: '',
    orderNumber: '',
    amount: 0,
  });

  const [rawAmountInput, setRawAmountInput] = useState('');
  const [formError, setFormError] = useState('');
  const [createdTicket, setCreatedTicket] = useState<VirtualTicket | null>(null);

  // Handle Form Submission -> Step 2
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.clientName.trim()) {
      setFormError('Por favor ingresá el nombre completo del cliente.');
      return;
    }
    if (!formData.clientPhone.trim()) {
      setFormError('Por favor ingresá un número de teléfono de contacto.');
      return;
    }
    if (!formData.orderNumber.trim()) {
      setFormError('Por favor ingresá el número de pedido del alquiler de tu traje.');
      return;
    }

    const cleanAmount = Number(rawAmountInput.replace(/[^0-9]/g, ''));
    if (!cleanAmount || cleanAmount <= 0) {
      setFormError('Por favor ingresá un monto válido de alquiler.');
      return;
    }

    setFormData((prev) => ({ ...prev, amount: cleanAmount }));
    setStep('plays');
  };

  // Filter plays according to rental amount
  // If amount is >= minAmountRequired, the play is unlocked.
  // We sort plays so unlocked ones appear first.
  const availablePlays = plays.filter((p) => formData.amount >= p.minAmountRequired);
  const higherTierPlays = plays.filter((p) => formData.amount < p.minAmountRequired);

  // If user amount is lower than all, show all with a courtesy upgrade or show the closest
  const displayedPlays = availablePlays.length > 0 ? availablePlays : plays.slice(0, 2);

  // Handle Play Selection -> Step 3
  const handleSelectPlay = (play: TheaterPlayOption) => {
    const ticket = createVirtualTicket(formData, play);

    // Confetti celebration
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dfb15b', '#fce09b', '#ffffff', '#eab308']
    });

    setCreatedTicket(ticket);
    setStep('ticket');
  };

  const handleResetFlow = () => {
    setStep('intro');
    setFormData({
      clientName: '',
      clientPhone: '',
      orderNumber: '',
      amount: 0,
    });
    setRawAmountInput('');
    setCreatedTicket(null);
    setFormError('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* STEP 0: INTRO SCREEN (Focused and clean) */}
      {step === 'intro' && (
        <div className="text-center py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Beneficio Exclusivo Clientes Divo Trajes • Temporada Carlos Paz 2027</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Canjeá tu entrada de teatro con tu{' '}
            <span className="gold-text-gradient">alquiler de traje</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Si alquilaste tu traje con Divo, tenés entradas de cortesía para las mejores obras teatrales de la Villa.
          </p>

          {/* MAIN PROMINENT BUTTON: QUIERO CANJEAR MIS ENTRADAS */}
          <div className="mt-10">
            <button
              onClick={() => setStep('form')}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-5 sm:py-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-serif font-black text-lg sm:text-2xl tracking-wider shadow-2xl shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Ticket className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:rotate-12 transition-transform" />
              <span>QUIERO CANJEAR MIS ENTRADAS</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Quick Features */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-amber-400 font-bold text-sm mb-1">1. Ingresás tus datos</div>
              <p className="text-xs text-zinc-400">
                Tu nombre, teléfono, número de pedido y monto de alquiler.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-amber-400 font-bold text-sm mb-1">2. Elegís tu obra</div>
              <p className="text-xs text-zinc-400">
                Catálogo de espectáculos habilitados en los mejores teatros de Carlos Paz.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-amber-400 font-bold text-sm mb-1">3. Descargás tu entrada</div>
              <p className="text-xs text-zinc-400">
                Entrada virtual personalizada al instante para presentar en sala.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: FORM WITH 4 FIELDS */}
      {step === 'form' && (
        <div className="max-w-xl mx-auto bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-zinc-800">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Ticket className="w-4 h-4" />
              <span>Paso 1 de 2 • Canje de Entradas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Completá tus datos de pedido
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Ingresá los 4 datos de tu alquiler para ver las obras teatrales disponibles para vos.
            </p>
          </div>

          {formError && (
            <div className="mb-4 p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Form with exactly 4 fields */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* 1. Nombre del cliente */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Nombre del Cliente *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Marcos Maidana"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* 2. Número de teléfono */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Número de Teléfono *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="Ej: 351 555-1234"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* 3. Número de pedido */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>Número de Pedido *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: PED-4821 o 1042"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 font-mono transition-colors"
              />
            </div>

            {/* 4. Monto */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>Monto del Alquiler ($ ARS) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 120000"
                value={rawAmountInput}
                onChange={(e) => setRawAmountInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700/80 text-amber-300 font-mono text-base font-bold placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Ingresá el valor abonado por el alquiler de tu traje o smoking.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('intro')}
                className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Volver
              </button>

              <button
                type="submit"
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VER OBRAS DE TEATRO DISPONIBLES</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>

          </form>
        </div>
      )}

      {/* STEP 2: THEATER PLAYS ACCORDING TO RENTAL AMOUNT */}
      {step === 'plays' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Summary Banner */}
          <div className="bg-zinc-950 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                Paso 2 de 2 • Selección de Espectáculo
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                Obras disponibles para tu alquiler
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Cliente: <strong className="text-white">{formData.clientName}</strong> • Pedido: <strong className="text-amber-300">#{formData.orderNumber}</strong> • Monto: <strong className="text-emerald-400">${formData.amount.toLocaleString('es-AR')}</strong>
              </p>
            </div>

            <button
              onClick={() => setStep('form')}
              className="text-xs text-amber-300 hover:text-amber-200 underline self-start sm:self-auto cursor-pointer"
            >
              Modificar datos o monto
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>
              Mostrando obras teatrales habilitadas según tu monto abonado:
            </span>
            <span className="text-amber-300 font-semibold">
              {displayedPlays.length} espectáculo(s) disponibles
            </span>
          </div>

          {/* Plays Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedPlays.map((play) => (
              <div
                key={play.id}
                className="group rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-amber-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-amber-950/20"
              >
                <div>
                  {/* Badge & Tier */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {play.tierBadge}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Habilitada por tu monto
                    </span>
                  </div>

                  {/* Play Title */}
                  <h4 className="text-xl sm:text-2xl font-serif font-black text-white group-hover:text-amber-300 transition-colors">
                    {play.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{play.genre}</p>

                  {/* Theater Venue */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong className="text-white">{play.theater}</strong> ({play.theaterAddress})
                    </span>
                  </div>

                  {/* Cast */}
                  <div className="mt-2 flex items-start gap-2 text-xs text-zinc-400">
                    <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Elenco:</strong> {play.cast}</span>
                  </div>

                  {/* Schedule */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{play.schedule}</span>
                  </div>

                  {/* Sector info */}
                  <div className="mt-4 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs">
                    <span className="text-zinc-400 block text-[11px]">Ubicación asignada en la entrada:</span>
                    <span className="text-amber-300 font-bold">{play.seatCategory}</span>
                  </div>
                </div>

                {/* Selection button */}
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => handleSelectPlay(play)}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Ticket className="w-4 h-4 text-black" />
                    <span>SELECCIONAR ESTA OBRA Y GENERAR ENTRADA</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notice about higher tier plays if any */}
          {higherTierPlays.length > 0 && (
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-400">
              <span className="text-amber-400 font-semibold">ℹ️ Tip: </span>
              Alquileres superiores a ${higherTierPlays[0]?.minAmountRequired.toLocaleString('es-AR')} habilitan también obras especiales de gala como <em>{higherTierPlays.map(p => p.title).join(', ')}</em>.
            </div>
          )}

        </div>
      )}

      {/* STEP 3: VIRTUAL TICKET PERSONALIZED READY TO DOWNLOAD */}
      {step === 'ticket' && createdTicket && (
        <VirtualTicketCard
          ticket={createdTicket}
          onReset={handleResetFlow}
        />
      )}

    </div>
  );
};
