import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useReservations } from '../../context/reservationContext';
import { Reservation } from '../../types/reservation';
import '../AddReservation/AddReservation.css';

const reservationSchema = z.object({
  guestName: z.string().min(1, { message: 'Imię i nazwisko jest wymagane' }),
  email: z.union([z.literal(''), z.string().email({ message: 'Nieprawidłowy adres email' })]),
  checkInDate: z.string().min(1),
  checkOutDate: z.string().min(1),
  status: z.enum(['Reserved', 'Due In', 'In House', 'Due Out', 'Checked Out', 'Canceled', 'No Show']),
  roomNumber: z.string().optional(),
  notes: z.string().optional()
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const EditReservation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateReservation } = useReservations();
  const reservation: Reservation = state.reservation;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestName: reservation.guestName || '',
      email: reservation.email || '',
      checkInDate: reservation.checkInDate || '',
      checkOutDate: reservation.checkOutDate || '',
      status: reservation.status,
      roomNumber: reservation.roomNumber || '',
      notes: reservation.notes || ''
    }
  });

  const handleBack = () => {
    navigate('/');
  };

  const onSubmit: SubmitHandler<ReservationFormData> = (data) => {
    const updatedReservation: Reservation = {
      ...reservation,
      ...data
    };
    updateReservation(updatedReservation);
    handleBack();
  };

  return (
    <div className='reservation-form-container'>
      <h1>Edytuj rezerwację</h1>
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
          <input disabled id='checkInDate' type='date' {...register('checkInDate')} />
        </div>
        <div className='form-group'>
          <label htmlFor='checkOutDate'>Data wyjazdu</label>
          <input disabled id='checkOutDate' type='date' {...register('checkOutDate')} />
        </div>
        <div className='form-group'>
          <label htmlFor='status'>Status początkowy</label>
          <input disabled id='status' type='text' {...register('status')} />
        </div>
        <div className='form-group'>
          <label htmlFor='roomNumber'>Numer pokoju</label>
          <input disabled id='roomNumber' type='text' {...register('roomNumber')} />
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
            Edytuj rezerwację
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReservation;
