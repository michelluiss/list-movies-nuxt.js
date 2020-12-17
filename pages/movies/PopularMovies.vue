<template>
  <v-row>
    <v-container>
      <v-row>
        <div class="col-3">
          <h1>Popular Movies</h1>
        </div>
        <div class="col-4 ml-auto">
          <inputSearch textPlaceholder="Search movie" @searchMovie="search"></inputSearch>
        </div>
      </v-row>
      <div v-if="movies.length <= 0" class="d-flex">
        <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
        <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
      </div>
      <v-row v-else>
        <v-col cols="3" v-for="(movie) in movies" :key="movie.id">
          <cardMovie :movie="movie"></cardMovie>
        </v-col>
        <InfiniteScroll :enough="enough" @load-more="getMovies()" />
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import inputSearch from '../../components/shared/search'
import cardMovie from '../../components/shared/cardMovie'

export default {
  components: {
    inputSearch,
    cardMovie
  },
  computed: {
    ...mapState({
      movies: state => state.movies
    })
  },
  data() {
    return {
      enough: false,
      loading: false,
      searchValue: ''
    }
  },
  created() {
    this.fetchMovies()
  },
  watch: {
    searchValue() {
      this.searchMovie(this.searchValue)
    }
  },
  beforeDestroy() {
    this.$store.commit('resetAllDataMovies')
  },
  methods: {
    getMovies() {
      if (this.searchValue !== '') this.searchMovie(this.searchValue)
      else this.fetchMovies()
    },
    fetchMovies() {
      if (this.loading) return
      this.loading = true
      this.$store.dispatch('movies')
        .then(response => {
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    searchMovie(searchValue) {
      if (searchValue !== '') this.$store.dispatch('searchMovie', searchValue)
      else this.$store.dispatch('movies')
    },
    search(value) {
      this.searchValue = value
    }
  }
}
</script>

<style lang="scss">
.link {
  text-decoration: none;
}
</style>