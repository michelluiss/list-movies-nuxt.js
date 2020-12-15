<template>
  <v-row>
    <v-container>
      <v-row>
        <div class="col-12">
          <h1>List Movies</h1>
        </div>
        <div v-if="listMovie.length <= 0" class="d-flex">
          <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
          <v-skeleton-loader width="250" type="card" class="mr-3"></v-skeleton-loader>
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
      this.$store.dispatch('listMovies')
    },
  }
}
</script>
