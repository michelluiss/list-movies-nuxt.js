import { moviesActions } from './actions'

import { moviesMutations } from './mutations'

import { moviesGetters } from './getters'

import Vue from 'vue'
import Vuex from 'vuex'

const request_token = JSON.parse(localStorage.getItem('request_token'))

Vue.use(Vuex)

const state = {
  movies: [],
  moviesMeta: {
    page: null
  },
  searchMoviesMeta: {
    page: null
  },
  movie: {},
  videos: [],
  list: [],
  listMovies: [],
  authentication: {
    api_key: request_token ? request_token.api_key : null,
    session_id: null,
    token: {
      request_token: null,
      expiry: null
    }
  }
}

const mutations = {
  saveToken(state, token) {
    state.authentication.token = token
  },
  saveApiKey(state, apiKey) {
    state.authentication.api_key = apiKey
  },
  saveSession(state, sessoionId) {
    state.authentication.session_id = sessoionId
  },
  setMovies(state, moviesList) {
    if (state.movies.length > 0 && moviesList.page > 1) state.movies = state.movies.concat(moviesList.results)
    else state.movies = moviesList.results
  },
  setMoviesMeta(state, meta) {
    state.moviesMeta = {
      page: meta.page
    }
  },
  setSearchMoviesMeta(state, meta) {
    state.searchMoviesMeta = {
      page: meta.page
    }
  },
  resetMovies(state) {
    state.movies = []
  },
  resetMetaMovies(state) {
    state.moviesMeta = {
      page: null
    }
  },
  resetSearchMoviesMeta(state) {
    state.searchMoviesMeta = {
      page: null
    }
  },
  resetAllDataMovies(state) {
    state.movies = []
    state.moviesMeta = {
      page: null
    }
    state.searchMoviesMeta = {
      page: null
    }
  },
  setMovie(state, movie) {
    state.movie = movie
  },
  setVideos(state, videos) {
    state.videos = videos
  },
  setList(state, listMovies) {
    state.list = listMovies
  },
  setListMovies(state, movies) {
    state.listMovies = movies
  },
  resetListMovies(state) {
    state.listMovies = []
  }
}

const actions = {
  async setAuthorization({ commit }) {
    const request_token = JSON.parse(localStorage.getItem('request_token'))
    const session_id = JSON.parse(localStorage.getItem('session_id'))
    if (request_token) {
      commit('saveToken', { request_token })
      commit('saveApiKey', request_token.api_key)
    }
    if (session_id) commit('saveSession', session_id.session_id)
  },
  async createToken({ commit }, payload) {
    const params = {
      api_key: payload.api_key
    }
    return await new Promise((resolve, reject) => {
      this.$axios.$get('/authentication/token/new', { params })
        .then(response => {
          const request_token = {
            request_token: response.request_token,
            expiry: Number(new Date(response.expires_at)),
            api_key: params.api_key
          }
          localStorage.setItem('request_token', JSON.stringify(request_token))
          commit('saveToken', request_token)
          commit('saveApiKey', params.api_key)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  async login({ commit, state }, body) {
    const params = {
      api_key: state.authentication.api_key
    }
    return await new Promise((resolve, reject) => {
      this.$axios.$post('/authentication/token/validate_with_login', body, { params })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  async getSessinId({ commit, state }, requestToken) {
    const params = {
      api_key: state.authentication.api_key
    }
    const body = {
      request_token: requestToken
    }
    return await new Promise((resolve, reject) => {
      this.$axios.$post('/authentication/session/new', body, { params })
        .then(response => {
          const session_id = { session_id: response.session_id }
          localStorage.setItem('session_id', JSON.stringify(session_id))
          commit('saveSession', response.session_id)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  async movies({ commit, state }) {
    commit('resetSearchMoviesMeta')
    const params = {
      api_key: state.authentication.api_key,
      page: state.moviesMeta.page ? (state.moviesMeta.page + 1) : 1
    }
    await this.$axios.$get('/movie/popular', { params })
      .then(response => {
        commit('setMovies', response)
        const meta = {
          page: response.page,
          total_pages: response.total_pages,
          total_results: response.total_results
        }
        commit('setMoviesMeta', meta)
        return true
      })
      .catch(error => {
        return error
      })
  },
  async movie({ commit, state }, movieId) {
    const params = {
      api_key: state.authentication.api_key
    }
    return await this.$axios.$get(`/movie/${movieId}`, { params })
      .then(response => {
        commit('setMovie', response)
        return true
      })
      .catch(error => {
        return error
      })
  },
  async searchMovie({ commit, state }, searchValue) {
    commit('resetMetaMovies')
    const params = {
      api_key: state.authentication.api_key,
      page: state.searchMoviesMeta.page ? (state.searchMoviesMeta.page + 1) : 1
    }
    params.query = searchValue
    return await this.$axios.$get('/search/movie', { params })
      .then(response => {
        commit('setMovies', response)
        const meta = {
          page: response.page,
          total_pages: response.total_pages,
          total_results: response.total_results
        }
        commit('setSearchMoviesMeta', meta)
        return true
      })
      .catch(error => {
        return error
      })
  },
  async getVideos({ commit, state }, movieId) {
    const params = {
      api_key: state.authentication.api_key
    }
    return await this.$axios.$get(`/movie/${movieId}/videos`, { params })
      .then(response => {
        commit('setVideos', response.results)
        return true
      })
      .catch(error => {
        return error
      })
  },
  async listMovies({ commit, state }) {
    const params = {
      api_key: state.authentication.api_key,
      session_id: state.authentication.session_id
    }
    return await this.$axios.$get('/account/account_id/lists', { params })
      .then(response => {
        commit('setList', response.results)
        return true
      })
      .catch(error => {
        return error
      })
  },
  async list({ commit, state }, listId) {
    const params = {
      api_key: state.authentication.api_key
    }
    return await this.$axios.$get(`/list/${listId}`, { params })
      .then(response => {
        commit('setListMovies', response)
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
