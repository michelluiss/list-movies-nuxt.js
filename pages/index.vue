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
          <v-card height="100%">
            <NuxtLink :to="`/movie/${movie.id}`" class="link">
              <v-img
                class="white--text align-end"
                height="350px"
                :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
              >
                <v-card-title>{{movie.title}}</v-card-title>
              </v-img>
            </NuxtLink>

            <v-card-subtitle class="pb-0">Rating {{movie.vote_average}}</v-card-subtitle>

            <v-card-text class="text--primary">
              <p>{{movie.overview.substring(0, 150)}}</p>
            </v-card-text>

            <v-card-actions>
              <NuxtLink :to="`/movie/${movie.id}`" class="link">
                <v-btn
                  color="red"
                  class="ma-2 white--text"
                >
                  Read more
                  <v-icon right dark>mdi-chevron-right</v-icon>
                </v-btn>
              </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import inputSearch from '../components/shared/search'

export default {
  components: {
    inputSearch
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