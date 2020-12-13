<template>
  <v-row>
    <v-container>
      <v-row>
        <div class="col-3">
          <h1>Popular Movies</h1>
        </div>
        <div class="col-4 ml-auto">
          <inputSearch textPlaceholder="Search movie" @searchMovie="searchMovie"></inputSearch>
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
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import inputSearch from '../components/shared/search'
import cardMovie from '../components/shared/cardMovie'

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
  async fetch({store}) {
    await store.dispatch('movies')
  },
  created() {
  },
  methods: {
    searchMovie(searchValue) {
      if (searchValue !== '') this.$store.dispatch('searchMovie', searchValue)
      else this.$store.dispatch('movies')
    }
  }
}
</script>

<style lang="scss">
.link {
  text-decoration: none;
}
</style>