<template>
  <v-container>
    <span class="text-center" v-if="loading">Loading...</span>
    <div class="movie-details-page" v-else>
      <h1>Movie: {{ movie.title }}</h1>
      <v-row>
        <v-col cols="3">
          <img :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`" alt="" width="100%">
        </v-col>
        <v-col cols="9">
          <div class="rating">
            <v-list-item-title class="mb-2"><strong>Rating</strong></v-list-item-title>
            <v-rating v-model="movie.vote_average" length="10" readonly color="red"></v-rating>
          </div>
          <div class="genres">
            <v-list-item-title class="mb-2"><strong>Genres</strong></v-list-item-title>
            <v-chip v-for="genre in movie.genres" :key="genre.id" color="red" class="mr-1">
              {{ genre.name }}
            </v-chip>
          </div>
          <div class="launch mt-3">
            <p><strong>Launch:</strong> {{movie.release_date}}</p>
            <p><strong>Durations:</strong> {{movie.runtime}} minutes</p>
          </div>
          <div class="description">
            <v-list-item-title class="mb-2"><strong>Sinopse</strong></v-list-item-title>
            <p>{{movie.overview}}</p>
          </div>
        </v-col>
        <v-col>
          <v-skeleton-loader
            type="article"
            width="100%"
            v-if="!listVideos"
          ></v-skeleton-loader>
          <div v-else>
            <h2 class="mb-4">Mídias</h2>
            <v-expansion-panels multiple>
              <v-expansion-panel v-for="(video) in listVideos" :key="video.id">
                <v-expansion-panel-header>{{video.name}}</v-expansion-panel-header>
                <v-expansion-panel-content class="text-center">
                  <videos 
                    width="1024"
                    height="576"
                    :keyVideo="video.key">
                  </videos>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import videos from '~/components/videos'
import { mapState } from 'vuex'

export default {
  components: {
    videos
  },
  data() {
    return {
      movieId: null,
      loading: true,
      listVideos: null
    }
  },
  computed: {
    ...mapState({
      movie: state => state.movie,
      videos: state => state.videos
    })
  },
  watch: {
    movieId() {
      if (this.movieId) {
        this.fetchMovie()
        this.fetchVideo()
      }
    },
    videos() {
      this.listVideos = this.videos.filter(item => {
        return item.site === 'YouTube'
      })
    }
  },
  created() {
    this.movieId = this.$route.params.id
  },
  methods: {
    fetchMovie() {
      this.$store.dispatch('movie', this.movieId)
        .then(response => {
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchVideo() {
      this.$store.dispatch('getVideos', this.movieId)
    }
  }
}
</script>
