import { CgPlayListAdd } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';
import { IoEyeOutline } from 'react-icons/io5';
import { useFilm, type Film } from '../contexts/FilmContext';

type FilmCardProps = {
  film: Film;
  removeFromStorage?: (imdbID: string) => void;
};

const FilmCard = ({ film, removeFromStorage = () => {} }: FilmCardProps) => {
  const { addToSeenIt, addToWatchIt, isInList } = useFilm();

  return (
    <>
      {film?.Title ? (
        <section className="filmCard">
          <figure>
            <img src={film.Poster} alt={film.Title} />
          </figure>
          <article className="details">
            <h2>{film.Title}</h2>
            <p>
              <strong>Directed By:</strong> {film.Director}
            </p>
            <p>
              <strong>Starring:</strong> {film.Actors}
            </p>
            <p>
              <strong>Released:</strong> {film.Released}
            </p>
            <p>
              <strong>Genre:</strong> {film.Genre}
            </p>
          </article>
          <article className="plot">
            <p>
              <strong>Plot:</strong> {film.Plot}
            </p>
          </article>
          {isInList(film.imdbID) ? (
            <aside className="icons">
              <ImCross
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={() => removeFromStorage(film.imdbID)}
              />
            </aside>
          ) : (
            <aside className="icons">
              <CgPlayListAdd
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToWatchIt(film)}
              />
              <IoEyeOutline
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToSeenIt(film)}
              />
            </aside>
          )}
        </section>
      ) : (
        <h1 style={{ margin: '16px 0' }}>Please search for a film.</h1>
      )}
    </>
  );
};

export default FilmCard;
