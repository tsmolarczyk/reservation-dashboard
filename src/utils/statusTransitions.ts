import { ReservationStatus } from '../types/reservation';

export const STATUS_TRANSITIONS: Record<ReservationStatus, ReservationStatus[]> = {
  'Reserved': ['Canceled', 'Due In'],
  'Due In': ['Canceled', 'No Show', 'In House'],
  'In House': ['Checked Out'],
  'Checked Out': ['In House'],
  'Canceled': ['Reserved'],
  'Due Out': [],
  'No Show': []
};

export const getAvailableStatusTransitions = (
  currentStatus: ReservationStatus): ReservationStatus[] => {
  return STATUS_TRANSITIONS[currentStatus] || [];
};
