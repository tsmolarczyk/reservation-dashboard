import { useNavigate } from 'react-router-dom';
import { ReservationStatus } from '../../types/reservation';
import './AddReservation.css';

const AddReservation = () => {
  const navigate = useNavigate();

  const reservationStatuses: ReservationStatus[] = [
    'Reserved',
    'Due In',
    'In House',
    'Due Out',
    'Checked Out',
    'Canceled',
    'No Show'
  ];
  const handleBack = () => {
    navigate('/');
  };
  return (
    <div className='reservation-form-container'>
      <h1>Dodaj nową rezerwację</h1>
      <form className='reservation-form'>
        <div className='form-group'>
          <label htmlFor='guestName'>Imię i nazwisko</label>
          <input id='guestName' type='text' />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' />
        </div>
        <div className='form-group'>
          <label htmlFor='checkInDate'>Data przyjazdu</label>
          <input id='checkInDate' type='date' />
        </div>
        <div className='form-group'>
          <label htmlFor='checkOutDate'>Data wyjazdu</label>
          <input id='checkOutDate' type='date' />
        </div>
        <div className='form-group'>
          <label htmlFor='status'>Status początkowy</label>
          <select id='status'>
            {reservationStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='room'>Numer pokoju</label>
          <input id='room' type='text' />
        </div>
        <div className='form-group'>
          <label htmlFor='notes'>Notatki</label>
          <textarea id='notes'></textarea>
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
