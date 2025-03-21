import FilmCard from '../components/FilmCard';
import { useFilm } from '../contexts/FilmContext';

const SeenIt = () => {
  const { seenList, removeFromSeenIt } = useFilm();

  return (
    <>
      <h1 className="pageHeader">Seen It</h1>
      {!seenList?.length || seenList.length === 0 ? (
        <h1 style={{ margin: '16px 0' }}>
          Add films you've already seen here.
        </h1>
      ) : (
        <ul>
          {seenList.map((film) => (
            <FilmCard
              film={film}
              key={film.Title}
              removeFromStorage={removeFromSeenIt}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default SeenIt;
