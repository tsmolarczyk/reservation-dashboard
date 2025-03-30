import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Reservation, ReservationStatus } from '../../types/reservation';
import ReservationBoard from './ReservationBoard';

const mockReservations = [
  {
    id: 'res-001',
    guestName: 'Jan Kowalski',
    checkInDate: '2023-07-10',
    checkOutDate: '2023-07-15',
    status: 'Reserved' as ReservationStatus,
    roomNumber: '101'
  },
  {
    id: 'res-002',
    guestName: 'Anna Nowak',
    checkInDate: '2023-07-12',
    checkOutDate: '2023-07-17',
    status: 'In House' as ReservationStatus,
    roomNumber: '102'
  },
  {
    id: 'res-003',
    guestName: 'Piotr Wiśniewski',
    checkInDate: '2023-07-15',
    checkOutDate: '2023-07-20',
    status: 'Due In' as ReservationStatus,
    roomNumber: '103'
  }
];

vi.mock('../../context/reservationContext', () => ({
  useReservations: () => ({
    reservations: mockReservations
  })
}));

vi.mock('./ReservationCard/ReservationCard', () => ({
  default: ({ reservation, statusColor }: { reservation: Reservation; statusColor: string }) => (
    <div data-testid='reservation-card' data-status={reservation.status} data-color={statusColor}>
      {reservation.guestName}
    </div>
  )
}));

describe('ReservationBoard', () => {
  test('Should render all status columns', () => {
    // Act
    const { getByText } = render(<ReservationBoard />);

    // Assert
    expect(getByText('Reserved')).toBeDefined();
    expect(getByText('Due In')).toBeDefined();
    expect(getByText('In House')).toBeDefined();
    expect(getByText('Due Out')).toBeDefined();
    expect(getByText('Checked Out')).toBeDefined();
    expect(getByText('Canceled')).toBeDefined();
    expect(getByText('No Show')).toBeDefined();
  });

  test('Should pass correct color to reservation card', () => {
    // Act
    const { getAllByTestId } = render(<ReservationBoard />);

    // Assert
    const cards = getAllByTestId('reservation-card');

    expect(cards.find((card) => card.getAttribute('data-status') === 'Reserved')?.getAttribute('data-color')).toBe(
      '#3498db'
    );
    expect(cards.find((card) => card.getAttribute('data-status') === 'In House')?.getAttribute('data-color')).toBe(
      '#9b59b6'
    );
    expect(cards.find((card) => card.getAttribute('data-status') === 'Due In')?.getAttribute('data-color')).toBe(
      '#2ecc71'
    );
  });
});
