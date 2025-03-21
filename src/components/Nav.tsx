import { Link, useLocation } from 'react-router-dom';
import { useFilm } from '../contexts/FilmContext';

const Nav = () => {
  const currentPage = useLocation().pathname;
  const { seenList, watchList } = useFilm();

  return (
    <nav>
      <h1>
        <Link to="/" id="logo">
          Film Tracker
        </Link>
      </h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <h2>
            <Link
              to="/"
              className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
            >
              HOME
            </Link>
          </h2>
        </li>
        <li className="nav-item">
          <h2>
            <Link
              to="/WatchList"
              className={
                currentPage === '/WatchList' ? 'nav-link active' : 'nav-link'
              }
              style={{ position: 'relative' }}
            >
              WATCH LIST{' '}
              {watchList.length ? <span>({watchList.length})</span> : null}
            </Link>
          </h2>
        </li>
        <li className="nav-item">
          <h2>
            <Link
              to="/SeenIt"
              className={
                currentPage === '/SeenIt' ? 'nav-link active' : 'nav-link'
              }
              style={{ position: 'relative' }}
            >
              SEEN IT{' '}
              {seenList.length ? <span>({seenList.length})</span> : null}
            </Link>
          </h2>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
