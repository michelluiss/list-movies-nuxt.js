<template>
  <v-row>
    <v-container>
      <v-row>
        <div class="col-12">
          <h1>List Movies</h1>
        </div>
        <div v-if="listMovie.length <= 0 && loading" class="d-flex col-12">
          <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
          <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
        </div>
        <div v-else-if="feedbackError" class="col-12">
          <v-alert type="error">
            Ops, ocorreu um erro. Tente novamente em alguns instantes!
          </v-alert>
        </div>
        <v-row v-else>
          <v-col cols="3" v-for="(list) in listMovie" :key="list.id">
            <cardList :list="list"></cardList>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import cardList from '../../components/shared/cardList'

export default {
  name: 'ListMovies',
  components: {
    cardList
  },
  data() {
    return {
      feedbackError: false,
      loading: false
    }
  },
  computed: {
    ...mapState({
      listMovie: state => state.list
    })
  },
  created() {
    this.listMovies()
  },
  methods: {
    listMovies() {
      if (this.loading) return
      this.loading = true
      this.$store.dispatch('listMovies')
        .then(response => {
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.feedbackError = true
          console.log(error)
        })
    },
  }
}
</script>
