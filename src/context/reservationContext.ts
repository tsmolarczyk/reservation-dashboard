import { createContext, useContext } from 'react';
import { Reservation } from '../types/reservation';

interface ReservationContextType {
  reservations: Reservation[];
  loading: boolean;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (reservation: Reservation) => void;
  removeReservation: (reservationId: string) => void;
}

export const ReservationContext = createContext<ReservationContextType>({
  reservations: [],
  loading: true,
  addReservation: () => {},
  updateReservation: () => {},
  removeReservation: () => {}
});

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};
