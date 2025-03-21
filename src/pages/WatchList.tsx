import FilmCard from '../components/FilmCard';
import { useFilm } from '../contexts/FilmContext';

const WatchList = () => {
  const { watchList, removeFromWatchIt } = useFilm();

  return (
    <>
      <h1 className="pageHeader">Watch List</h1>
      {!watchList?.length || watchList?.length === 0 ? (
        <h1 style={{ margin: '16px 0' }}>Add films to your watchlist.</h1>
      ) : (
        <ul>
          {watchList.map((film) => (
            <FilmCard
              film={film}
              key={film.Title}
              removeFromStorage={removeFromWatchIt}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default WatchList;
