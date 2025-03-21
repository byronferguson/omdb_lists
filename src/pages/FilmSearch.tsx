import { useRef } from 'react';
import FilmCard from '../components/FilmCard';
import { useFilm } from '../contexts/FilmContext';

const FilmSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { foundFilm, searchByTitle, removeFromSeenIt, removeFromWatchIt } =
    useFilm();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = inputRef.current?.value;

    if (!title) return;

    await searchByTitle(title);
    inputRef.current.value = '';
  }

  function handleRemove(imdbID: string) {
    removeFromSeenIt(imdbID);
    removeFromWatchIt(imdbID);
  }

  return (
    <>
      <section id="searchSection">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter a Film" ref={inputRef} />
          <button type="submit" id="searchBtn">
            Search
          </button>
        </form>
      </section>
      {foundFilm ? (
        <FilmCard film={foundFilm} removeFromStorage={handleRemove} />
      ) : null}
    </>
  );
};

export default FilmSearch;
