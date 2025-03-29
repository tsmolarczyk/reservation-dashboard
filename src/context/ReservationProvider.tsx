import { useEffect, useState } from 'react';
import reservationsData from '../data/reservations.json';
import { Reservation } from '../types/reservation';
import { mapResponseObjectToReservation } from '../utils/reservationUtils';
import { ReservationContext } from './reservationContext';

export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      try {
        const validReservations = reservationsData.map(mapResponseObjectToReservation);
        setReservations(validReservations);
      } catch (error) {
        console.error('Błąd podczas przetwarzania danych rezerwacji:', error);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, []);

  const updateReservation = (updatedReservation: Reservation) => {
    setReservations((reservations) =>
      reservations.map((res) => (res.id === updatedReservation.id ? updatedReservation : res))
    );
  };

  const removeReservation = (reservationId: string) => {
    setReservations((reservations) => reservations.filter((res) => res.id !== reservationId));
  };

  const contextValue = {
    reservations,
    loading,
    updateReservation,
    removeReservation
  };

  return <ReservationContext.Provider value={contextValue}>{children}</ReservationContext.Provider>;
};
