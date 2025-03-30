import { render } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ReservationStatus } from '../../../types/reservation';
import ReservationCard from './ReservationCard';

const mockUpdateReservation = vi.fn();
const mockRemoveReservation = vi.fn();

vi.mock('../../../context/reservationContext', () => ({
  useReservations: () => ({
    updateReservation: mockUpdateReservation,
    removeReservation: mockRemoveReservation
  })
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

const mockGetAvailableStatusTransitions = vi.fn();
vi.mock('../../../utils/statusTransitions', () => ({
  getAvailableStatusTransitions: (status: ReservationStatus) => mockGetAvailableStatusTransitions(status)
}));

const statusColors: Record<string, string> = {
  'Reserved': '#3498db',
  'Due In': '#2ecc71',
  'In House': '#9b59b6',
  'Due Out': '#f39c12',
  'Checked Out': '#7f8c8d',
  'Canceled': '#e74c3c',
  'No Show': '#c0392b'
};

describe('ReservationCard', () => {
  beforeEach(() => {
    mockGetAvailableStatusTransitions.mockReturnValue([]);
  });
  test('Should display guest name and stay dates', () => {
    // Arrange
    const reservation = {
      id: 'res-016',
      guestName: 'Tomasz Smolarczyk',
      checkInDate: '2023-07-15',
      checkOutDate: '2023-07-20',
      status: 'Reserved' as ReservationStatus,
      roomNumber: '102',
      notes: 'Test notes',
      email: 'tomasz.smolarczyk@example.com'
    };
    // Act
    const { getByText } = render(
      <ReservationCard reservation={reservation} statusColor={statusColors[reservation.status]} />
    );

    // Assert
    expect(getByText('Tomasz Smolarczyk')).toBeDefined();
    expect(getByText('Przyjazd:')).toBeDefined();
    expect(getByText('Wyjazd:')).toBeDefined();
    expect(getByText('Pokój:')).toBeDefined();
    expect(getByText('102')).toBeDefined();
  });

  test('Should NOT display notes when notes are not provided', () => {
    // Arrange
    const reservation = {
      id: 'res-016',
      guestName: 'Tomasz Smolarczyk',
      checkInDate: '2023-07-15',
      checkOutDate: '2023-07-20',
      status: 'Reserved' as ReservationStatus,
      roomNumber: '102',
      notes: undefined
    };

    // Act
    const { container } = render(
      <ReservationCard reservation={reservation} statusColor={statusColors[reservation.status]} />
    );

    // Assert
    expect(container.querySelector('.notes')).toBeNull();
  });

  test('Should display status change icon when status transitions are available', () => {
    // Arrange
    mockGetAvailableStatusTransitions.mockReturnValue(['Canceled', 'Due In']);

    const reservation = {
      id: 'res-016',
      guestName: 'Tomasz Smolarczyk',
      checkInDate: '2023-07-15',
      checkOutDate: '2023-07-20',
      status: 'Reserved' as ReservationStatus,
      roomNumber: '102',
      notes: 'Test notes'
    };

    // Act
    const { getByText } = render(
      <ReservationCard reservation={reservation} statusColor={statusColors[reservation.status]} />
    );
    // Assert
    expect(getByText('⋮')).toBeDefined();
  });

  test('Should NOT display room number when roomNumber is not provided', () => {
    // Arrange
    const reservation = {
      id: 'res-016',
      guestName: 'Tomasz Smolarczyk',
      checkInDate: '2023-07-15',
      checkOutDate: '2023-07-20',
      status: 'Reserved' as ReservationStatus,
      roomNumber: undefined,
      notes: 'Test notes'
    };

    // Act
    const { queryByText } = render(
      <ReservationCard reservation={reservation} statusColor={statusColors[reservation.status]} />
    );

    // Assert
    expect(queryByText('Pokój:')).toBeNull();
  });

  test('Should call removeReservation when delete button is clicked', () => {
    // Arrange
    mockRemoveReservation.mockClear();

    const reservation = {
      id: 'res-016',
      guestName: 'Tomasz Smolarczyk',
      checkInDate: '2023-07-15',
      checkOutDate: '2023-07-20',
      status: 'Reserved' as ReservationStatus,
      roomNumber: '102',
      notes: 'Test notes'
    };

    // Act
    const { container } = render(
      <ReservationCard reservation={reservation} statusColor={statusColors[reservation.status]} />
    );

    const deleteButton = container.querySelector('.btn-remove') as HTMLButtonElement;
    expect(deleteButton).not.toBeNull();
    deleteButton.click();

    // Assert
    expect(mockRemoveReservation).toHaveBeenCalledWith('res-016');
  });
});
