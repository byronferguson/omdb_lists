import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { FilmProvider } from './contexts/FilmContext';

function App() {
  return (
    <FilmProvider>
      <Nav />
      <main>
        <Outlet />
      </main>
    </FilmProvider>
  );
}

export default App;
