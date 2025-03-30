import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useReservations } from '../../context/reservationContext';
import { ReservationStatus } from '../../types/reservation';
import './AddReservation.css';

const reservationSchema = z.object({
  guestName: z.string().min(1, { message: 'Imię i nazwisko jest wymagane' }),
  email: z.union([z.literal(''), z.string().email({ message: 'Nieprawidłowy adres email' })]),
  checkInDate: z.string().min(1),
  checkOutDate: z.string().min(1),
  status: z.enum(['Reserved', 'Due In']),
  roomNumber: z.string().optional(),
  notes: z.string().optional()
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const AddReservation = () => {
  const navigate = useNavigate();
  const { reservations, addReservation } = useReservations();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const reservationStatuses: ReservationStatus[] = ['Reserved', 'Due In'];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestName: '',
      email: '',
      checkInDate: today,
      checkOutDate: tomorrow,
      status: 'Reserved',
      roomNumber: '',
      notes: ''
    }
  });

  const checkInDate = watch('checkInDate');

  const isDateToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const handleBack = () => {
    navigate('/');
  };

  const getNextId = () => {
    const nextNumber = reservations.length + 1;
    return `res-${nextNumber.toString().padStart(3, '0')}`;
  };

  const onSubmit: SubmitHandler<ReservationFormData> = (data) => {
    const newReservation = {
      id: getNextId(),
      guestName: data.guestName,
      email: data.email,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      status: data.status,
      roomNumber: data.roomNumber,
      notes: data.notes
    };

    addReservation(newReservation);
    navigate('/');
  };

  useEffect(() => {
    const newStatus = isDateToday(checkInDate) ? 'Due In' : 'Reserved';
    setValue('status', newStatus);
  }, [checkInDate, setValue]);

  return (
    <div className='reservation-form-container'>
      <h1>Dodaj nową rezerwację</h1>
      <form className='reservation-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='guestName'>Imię i nazwisko</label>
          <input id='guestName' type='text' {...register('guestName')} />
          <p className='error'>{errors.guestName?.message}</p>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' {...register('email')} />
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div className='form-group'>
          <label htmlFor='checkInDate'>Data przyjazdu</label>
          <input id='checkInDate' type='date' {...register('checkInDate')} />
        </div>
        <div className='form-group'>
          <label htmlFor='checkOutDate'>Data wyjazdu</label>
          <input id='checkOutDate' type='date' {...register('checkOutDate')} />
        </div>
        <div className='form-group'>
          <label htmlFor='status'>Status początkowy</label>
          <select id='status' {...register('status')}>
            {reservationStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='roomNumber'>Numer pokoju</label>
          <input id='roomNumber' type='text' {...register('roomNumber')} />
          <p className='error'>{errors.roomNumber?.message}</p>
        </div>
        <div className='form-group'>
          <label htmlFor='notes'>Notatki</label>
          <textarea id='notes' {...register('notes')} />
        </div>

        <div className='form-actions'>
          <button className='cancel-btn' type='button' onClick={handleBack}>
            Anuluj
          </button>
          <button className='add-btn' type='submit'>
            Dodaj rezerwację
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReservation;
