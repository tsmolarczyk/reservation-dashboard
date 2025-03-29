import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <h1>Strona, której szukasz nie istnieje</h1>
      <Link to='/'>Wróć do strony głównej</Link>
    </div>
  );
};

export default ErrorPage;
