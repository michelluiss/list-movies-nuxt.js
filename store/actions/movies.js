
export const getMovies = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    console.log(process.env.VUE_APP_THE_MOVIE_API_KEY)
    const params = {
      api_key: process.env.VUE_APP_THE_MOVIE_API_KEY,
      page: 1
    }
    this.$axios.$get('/movie/popular', { params })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
