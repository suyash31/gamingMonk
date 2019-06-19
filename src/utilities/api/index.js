const apiKey = '2a671035dfc92a484f298c77f7a0c6b9';
const lang = 'en-US';

export const getPopularMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${lang}&page=${page}`;
  return fetch (url)
  .then(res => res.json())
  .catch(e => e)
}
