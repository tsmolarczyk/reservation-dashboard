import './App.css';
import Header from './components/Header/Header';
import ReservationBoard from './components/ReservationsDashboard/ReservationBoard';
import { useReservations } from './context/reservationContext';

function App() {
  const { loading } = useReservations();

  return (
    <div className='app-container'>
      <Header />
      <main className='main-content'>
        {loading ? (
          <div className='loading'>Ładowanie danych rezerwacji...</div>
        ) : (
          <ReservationBoard />
        )}
      </main>
    </div>
  );
}

export default App;
