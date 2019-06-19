import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import selectMovieReducer from './selectMovieReducer';
import loadMoreReducer from './loadMoreReducer';

export default combineReducers ({
  moviesList: MovieReducer,
  selectedMovieId: selectMovieReducer,
  loadCount: loadMoreReducer
})