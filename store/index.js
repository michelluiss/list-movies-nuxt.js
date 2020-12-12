import { moviesActions } from './actions'

import { moviesMutations } from './mutations'

import { moviesGetters } from './getters'

import Vue from 'vue'
import Vuex from 'vuex'

import config from '@/config'

Vue.use(Vuex)

const state = {
  movies: [{ name: 'teste' }]
}

const mutations = {
  setMovie(state, moviesList) {
    state.movies = moviesList.results
  }
}

const actions = {
  async movie({ commit }) {
    const params = {
      api_key: config.apiKey,
      page: 1
    }
    await this.$axios.$get('/movie/popular', { params })
      .then(response => {
        commit('setMovie', response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const getters = {
  getMove (state) {
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
