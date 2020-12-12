import Vue from 'vue'

export function movies(state, movies) {
  console.log(movies)
  console.log(state)
  // if (movies.edges.length > 0) {
  //   // state.movies = movies.edges
  // } else state.movies = []
}

export function resetMovies(state) {
  state.movies = []
}

export function resetMoviesMeta(state) {
  Vue.set(state.meta, 'total', null)
}
