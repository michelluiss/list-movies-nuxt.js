<template>
  <v-container>
    <div class="list-page">
      <NuxtLink :to="'/list-movies'" class="link"><v-icon color="#FFAB00" size="13" class="mr-1">mdi-arrow-left</v-icon>List Movies</NuxtLink>
      <h1>List: {{ listMovies.name }}</h1>
      <div v-if="listMovies && !listMovies.id" class="d-flex">
        <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
        <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
      </div>
      <v-row v-else>
        <v-col cols="3" v-for="(movie) in listMovies.items" :key="movie.id">
          <cardMovie :movie="movie"></cardMovie>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import cardMovie from '../../components/shared/cardMovie'

export default {
  name: 'List',
  components: {
    cardMovie
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState({
      listMovies: state => state.listMovies
    })
  },
  created() {
    this.fetchList()
  },
  beforeDestroy() {
    this.$store.commit('resetListMovies')
  },
  methods: {
    fetchList() {
      this.$store.dispatch('list', this.$route.params.id)
        .then(response => {
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.list-page {
  .link {
    color: #FFAB00;
    font-size: 13px;
  }
}
</style>
