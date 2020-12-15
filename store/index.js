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
  videos: [],
  list: [],
  listMovies: [],
  authentication: {
    api_key: null,
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
    state.movies = moviesList
  },
  resetMovies(state) {
    state.movies = []
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
  }
}

const actions = {
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
      api_key: state.authentication.apiKey
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
      api_key: state.authentication.apiKey
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
  async movies({ commit }) {
    const params = getDefaultParams()
    params.page = 1
    await this.$axios.$get('/movie/popular', { params })
      .then(response => {
        commit('setMovies', response.results)
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
  async searchMovie({ commit }, searchValue) {
    commit('resetMovies')
    const params = getDefaultParams()
    params.query = searchValue
    return await this.$axios.$get('/search/movie', { params })
      .then(response => {
        commit('setMovies', response.results)
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
        console.log(response)
        commit('setListMovies', response)
        return true
      })
      .catch(error => {
        return error
      })
  },
  setAuthorization({ commit }) {
    const request_token = JSON.parse(localStorage.getItem('request_token'))
    const session_id = JSON.parse(localStorage.getItem('session_id'))
    if (request_token) {
      commit('saveToken', { request_token })
      commit('saveApiKey', request_token.api_key)
    }
    if (session_id) commit('saveSession', session_id.session_id)
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