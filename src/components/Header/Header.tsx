import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleAddReservation = () => {
    navigate('/add');
  };

  return (
    <header className='header'>
      <div className='header-content'>
        <div className='logo'>
          <h1>Dashboard Rezerwacji Hotelowych</h1>
        </div>
        <div className='header-actions'>
          <button className='add-reservation-button' onClick={handleAddReservation}>
            Dodaj rezerwację
          </button>
          <div className='date-display'>
            {new Date().toLocaleDateString('pl-PL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
