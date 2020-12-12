import { moviesActions } from './actions'

import { moviesMutations } from './mutations'

import { moviesGetters } from './getters'

import Vue from 'vue'
import Vuex from 'vuex'

import config from '@/config'

Vue.use(Vuex)

const state = {
  movies: [],
  movie: {},
  videos: []
}

const mutations = {
  setMovies(state, moviesList) {
    state.movies = moviesList.results
  },
  setMovie(state, movie) {
    state.movie = movie
  },
  setVideos(state, videos) {
    state.videos = videos
  }
}

const actions = {
  async movies({ commit }) {
    const params = getDefaultParams()
    params.page = 1
    await this.$axios.$get('/movie/popular', { params })
      .then(response => {
        commit('setMovies', response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async movie({ commit }, movieId) {
    const params = getDefaultParams()
    return await this.$axios.$get(`/movie/${movieId}`, { params })
      .then(response => {
        commit('setMovie', response)
        return true
      })
      .catch(error => {
        return error
      })
  },
  async getVideos({ commit }, movieId) {
    const params = getDefaultParams()
    return await this.$axios.$get(`/movie/${movieId}/videos`, { params })
      .then(response => {
        commit('setVideos', response.results)
        return true
      })
      .catch(error => {
        return error
      })
  }
}

const getters = {
  getMovies(state) {
    state.movies
  }
}

export default { state, mutations, actions, getters }

// const moviesModule = {
//   state: {
//     movies: [],
//     meta: {
//       total: null,
//       cursor: {
//         prev: [],
//         current: [],
//         next: []
//       }
//     }
//   },
//   actions: moviesActions,
//   mutations: moviesMutations,
//   getters: moviesGetters,
//   namespaced: true
// }

// export default new Vuex.Store({
//   modules: { movies: moviesModule }
// })

function getDefaultParams() {
  return { api_key: config.apiKey }
}