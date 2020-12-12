<template>
  <v-row>
    <v-container>
      <h1>Popular Movies</h1>
      <v-row>
        <v-col cols="3" v-for="(movie) in movies" :key="movie.id">
          <v-card height="100%">
            <v-img
              class="white--text align-end"
              height="350px"
              :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
            >
              <v-card-title>{{movie.original_title}}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Rating {{movie.vote_average}}</v-card-subtitle>

            <v-card-text class="text--primary">
              <p>{{movie.overview.substring(0, 150)}}</p>
            </v-card-text>

            <v-card-actions>
              <NuxtLink to="/movie/10">
                <v-btn color="orange" text>Explore</v-btn>
              </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Logo,
    VuetifyLogo
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
  }
}
</script>
