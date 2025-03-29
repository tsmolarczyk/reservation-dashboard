import { createContext, useContext } from 'react';
import { Reservation } from '../types/reservation';

interface ReservationContextType {
  reservations: Reservation[];
  loading: boolean;
}

export const ReservationContext = createContext<ReservationContextType>({
  reservations: [],
  loading: true
});

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};
