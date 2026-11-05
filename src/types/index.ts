export interface ClientExchangeForm {
  clientName: string;
  clientPhone: string;
  orderNumber: string;
  amount: number;
}

export interface TheaterPlayOption {
  id: string;
  title: string;
  theater: string;
  theaterAddress: string;
  genre: string;
  cast: string;
  schedule: string;
  minAmountRequired: number;
  tierBadge: 'Plata' | 'Oro' | 'Estelar VIP';
  seatCategory: string;
}

export interface VirtualTicket {
  id: string;
  ticketCode: string;
  clientName: string;
  clientPhone: string;
  orderNumber: string;
  orderAmount: number;
  playId: string;
  playTitle: string;
  theater: string;
  theaterAddress: string;
  genre: string;
  schedule: string;
  seatCategory: string;
  issuedAt: string;
  status: 'valida' | 'usada';
}
