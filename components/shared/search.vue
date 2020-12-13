<template>
  <div class="videos">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      :placeholder="textPlaceholder"
      v-model="searchValue"
      @input="searchMovie"
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    textPlaceholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onDelay: false,
      searchValue: ''
    }
  },
  created() {},
  methods: {
    searchMovie() {
      if (this.onDelay) return
      this.onDelay = true
      setTimeout(() => {
        this.$emit('searchMovie', this.searchValue)
        this.onDelay = false
      }, 500)
    }
  }
}
</script>
