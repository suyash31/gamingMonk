export const selectMovie = (movieId) => {
  return {
    type: 'SELECT_MOVIE',
    payload: movieId
  }
}

export const addMovies = (allMovies) => {
  console.log('allMovies')
  return {
    type: 'ADD_MOVIES',
    payload: allMovies
  }
}

export const loadMore = (page) => {
  console.log('loadMore');
  return {
    type: 'LOAD_MORE',
    payload: page
  }
}