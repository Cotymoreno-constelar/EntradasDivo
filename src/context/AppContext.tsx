import React, { createContext, useContext, useState, useEffect } from 'react';
import { TheaterPlayOption, VirtualTicket, ClientExchangeForm } from '../types';
import { THEATER_PLAYS, INITIAL_VIRTUAL_TICKETS } from '../data/mockData';

interface AppContextType {
  plays: TheaterPlayOption[];
  tickets: VirtualTicket[];
  createVirtualTicket: (
    formData: ClientExchangeForm,
    selectedPlay: TheaterPlayOption
  ) => VirtualTicket;
  exportTicketsCSV: () => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TICKETS: 'divo_virtual_tickets_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plays] = useState<TheaterPlayOption[]>(THEATER_PLAYS);
  const [tickets, setTickets] = useState<VirtualTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
      return saved ? JSON.parse(saved) : INITIAL_VIRTUAL_TICKETS;
    } catch {
      return INITIAL_VIRTUAL_TICKETS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  }, [tickets]);

  const generateTicketCode = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DT-VCP27-${randomNum}`;
  };

  const createVirtualTicket = (
    formData: ClientExchangeForm,
    selectedPlay: TheaterPlayOption
  ): VirtualTicket => {
    const newTicket: VirtualTicket = {
      id: `tkt-${Date.now()}`,
      ticketCode: generateTicketCode(),
      clientName: formData.clientName.trim(),
      clientPhone: formData.clientPhone.trim(),
      orderNumber: formData.orderNumber.trim(),
      orderAmount: formData.amount,
      playId: selectedPlay.id,
      playTitle: selectedPlay.title,
      theater: selectedPlay.theater,
      theaterAddress: selectedPlay.theaterAddress,
      genre: selectedPlay.genre,
      schedule: selectedPlay.schedule,
      seatCategory: selectedPlay.seatCategory,
      issuedAt: new Date().toISOString(),
      status: 'valida',
    };

    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const exportTicketsCSV = () => {
    if (tickets.length === 0) {
      alert('No hay entradas virtuales registradas para exportar.');
      return;
    }

    const headers = [
      'Código de Entrada',
      'Cliente',
      'Teléfono',
      'N° de Pedido',
      'Monto Alquiler ($)',
      'Obra de Teatro',
      'Teatro',
      'Dirección',
      'Ubicación / Sector',
      'Fecha Emisión',
      'Estado'
    ];

    const rows = tickets.map((t) => [
      `"${t.ticketCode}"`,
      `"${t.clientName.replace(/"/g, '""')}"`,
      `"${t.clientPhone}"`,
      `"${t.orderNumber}"`,
      `"${t.orderAmount}"`,
      `"${t.playTitle.replace(/"/g, '""')}"`,
      `"${t.theater}"`,
      `"${t.theaterAddress}"`,
      `"${t.seatCategory}"`,
      `"${new Date(t.issuedAt).toLocaleString('es-AR')}"`,
      `"${t.status.toUpperCase()}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `divo_trajes_entradas_canjeadas_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetDemoData = () => {
    setTickets(INITIAL_VIRTUAL_TICKETS);
    localStorage.removeItem(STORAGE_KEYS.TICKETS);
  };

  return (
    <AppContext.Provider
      value={{
        plays,
        tickets,
        createVirtualTicket,
        exportTicketsCSV,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
