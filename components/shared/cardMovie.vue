<template>
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
</template>

<script>
export default {
  name: 'CardMovie',
  props: {
    movie: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {}
  },
  created() {
  },
}
</script>