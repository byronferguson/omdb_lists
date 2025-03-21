import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { searchOMDB } from '../api/API';
import { useLocalStorage } from '../hooks/use-local-storage';
import Film from '../utils/interfaces/Film.interface';
export type { default as Film } from '../utils/interfaces/Film.interface';

interface IFilmContext {
  foundFilm: Film | null;
  seenList: Film[];
  seenListIds: Set<string>;
  watchList: Film[];
  watchListIds: Set<string>;
  addToSeenIt: (film: Film) => void;
  addToWatchIt: (film: Film) => void;
  removeFromSeenIt: (imdbID: string) => void;
  removeFromWatchIt: (imdbID: string) => void;
  isInList: (imdbID: string) => boolean;
  searchByTitle: (title: string) => void;
}

const FilmContext = createContext<IFilmContext>({
  foundFilm: null,
  seenList: [],
  seenListIds: new Set(),
  watchList: [],
  watchListIds: new Set(),
  addToSeenIt: () => {},
  addToWatchIt: () => {},
  removeFromSeenIt: () => {},
  removeFromWatchIt: () => {},
  isInList: () => false,
  searchByTitle: () => {},
});

export function FilmProvider({ children }: PropsWithChildren) {
  /**
   * Search
   */
  const [foundMovie, setFoundMovie] = useState<Film | null>(null);
  async function searchByTitle(title: string) {
    const film = await searchOMDB(title);

    if (!film) return;

    setFoundMovie(film);
  }

  /**
   * Seen List
   */
  const [seenList, setSeenList] = useLocalStorage<Film[]>(
    [],
    'alreadySeenFilms',
  );
  const [seenListIds, setSeenListIds] = useState(() => {
    return new Set<string>(seenList.map(({ imdbID }) => imdbID));
  });

  function addToSeenIt(film: Film) {
    if (seenListIds.has(film.imdbID)) return;
    seenListIds.add(film.imdbID);

    setSeenListIds((prev) => prev.add(film.imdbID));
    setSeenList((prev) => [...prev, film]);
  }

  function removeFromSeenIt(imdbID: string) {
    setSeenListIds((prev) => {
      prev.delete(imdbID);
      return prev;
    });
    setSeenList((prev) => prev.filter((film) => film.imdbID !== imdbID));
  }

  /**
   * Watch List
   */
  const [watchList, setWatchList] = useLocalStorage<Film[]>([], 'filmsToWatch');
  const [watchListIds, setWatchListIds] = useState(() => {
    return new Set<string>(watchList.map(({ imdbID }) => imdbID));
  });

  function addToWatchIt(film: Film) {
    if (watchListIds.has(film.imdbID)) return;

    setWatchListIds((prev) => prev.add(film.imdbID));
    setWatchList((prev) => [...prev, film]);
  }

  function removeFromWatchIt(imdbID: string) {
    setWatchListIds((prev) => {
      prev.delete(imdbID);
      return prev;
    });
    setWatchList((prev) => prev.filter((film) => film.imdbID !== imdbID));
  }

  /**
   * Utilities
   */
  function isInList(imdbID: string) {
    return seenListIds.has(imdbID) || watchListIds.has(imdbID);
  }

  return (
    <FilmContext.Provider
      value={{
        foundFilm: foundMovie,
        seenList,
        seenListIds,
        watchList,
        watchListIds,
        addToSeenIt,
        addToWatchIt,
        removeFromSeenIt,
        removeFromWatchIt,
        isInList,
        searchByTitle,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}

export function useFilm() {
  return useContext(FilmContext);
}
