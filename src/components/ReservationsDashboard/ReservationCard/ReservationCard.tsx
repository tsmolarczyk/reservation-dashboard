import { useEffect, useRef, useState } from 'react';
import { useReservations } from '../../../context/reservationContext';
import { Reservation, ReservationStatus } from '../../../types/reservation';
import { formatDate } from '../../../utils/dateFormatters';
import { getAvailableStatusTransitions } from '../../../utils/statusTransitions';
import './ReservationCard.css';

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
}

const ReservationCard = ({ reservation, statusColor }: ReservationCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { updateReservation } = useReservations();

  const availableStatusTransitions = getAvailableStatusTransitions(reservation.status);
  const hasAvailableStatusTransitions = availableStatusTransitions.length > 0;

  const handleStatusChange = (newStatus: ReservationStatus) => {
    const updatedReservation = {
      ...reservation,
      status: newStatus
    };

    updateReservation(updatedReservation);
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='reservation-card'>
      <div className='card-status-indicator' style={{ backgroundColor: statusColor }}></div>
      <div className='card-content'>
        <div className='card-header'>
          <h3 className='guest-name'>{reservation.guestName}</h3>
          {hasAvailableStatusTransitions && (
            <div className='action-button' ref={menuRef}>
              <button className='btn-action' onClick={toggleDropdown}>
                ⋮
              </button>
              {isMenuOpen && (
                <div className='dropdown-menu'>
                  {availableStatusTransitions.map((status) => (
                    <button
                      key={status}
                      className='dropdown-item'
                      onClick={() => {
                        handleStatusChange(status);
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className='stay-dates'>
          <div className='date-range'>
            <span className='date-label'>Przyjazd:</span>
            <span className='date-value'>{formatDate(reservation.checkInDate)}</span>
          </div>
          <div className='date-range'>
            <span className='date-label'>Wyjazd:</span>
            <span className='date-value'>{formatDate(reservation.checkOutDate)}</span>
          </div>
        </div>

        {reservation.roomNumber && (
          <div className='room-number'>
            <span className='room-label'>Pokój:</span>
            <span className='room-value'>{reservation.roomNumber}</span>
          </div>
        )}

        {reservation.notes && (
          <div className='notes'>
            <p>{reservation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
