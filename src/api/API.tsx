import Film from '../utils/interfaces/Film.interface';

const searchOMDB = async (query: string): Promise<Film> => {
  try {
    console.log(import.meta.env.VITE_OMDB_API_KEY);
    const response = await fetch(
      `https://www.omdbapi.com/?t=${query}&apikey=${
        import.meta.env.VITE_OMDB_API_KEY
      }`,
    );

    console.log('Response:', response);
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }

    const data = await response.json();
    console.log('Data:', data);

    return data as Film;
  } catch (err) {
    console.log('an error occurred', err);
    return [];
  }
};

export { searchOMDB };
