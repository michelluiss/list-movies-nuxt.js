<template>
  <v-row>
    <v-container>
      <v-row>
        <div class="col-5 mx-auto">
          <h1>Login</h1>
          <v-text-field
            placeholder="User"
            v-model="user"
          >
          </v-text-field>
          <v-text-field
            placeholder="Password"
            v-model="password"
          >
          </v-text-field>
          <form action="">
            <v-text-field
              placeholder="API KEY"
              v-model="apiKey"
            >
            </v-text-field>
            <v-btn
              color="red"
              class="ma-2 white--text"
              @click.prevent="createToken()"
            >Login
            </v-btn>
          </form>
        </div>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      user: '',
      password: '',
      apiKey: ''
    }
  },
  computed: {
  },
  created() {
    const request_token = JSON.parse(localStorage.getItem('request_token'))
    console.log(request_token)
    if (request_token && request_token.expity > new Date()) {
      this.createToken()
    } else if (request_token) this.listMovies()
  },
  methods: {
    listMovies() {
      const session_id = JSON.parse(localStorage.getItem('session_id'))
      this.$store.dispatch('listMovies')
        .then(response => {
          this.$router.push({ path: '/popular-movies' })
        })
    },
    createToken() {
      const params = {
        api_key: this.apiKey
      }
      this.$store.dispatch('createToken', params)
        .then(response => {
          this.login(response.request_token)
        })
    },
    login(requestToken) {
      const params = {
        username: this.user,
        password: this.password,
        request_token: requestToken
      }
      this.$store.dispatch('login', params)
        .then(response => {
          this.getSessinId(response.request_token)
        })
    },
    getSessinId(requestToken) {
      this.$store.dispatch('getSessinId', requestToken)
        .then(response => {
          if (response.session_id) this.$router.push({ path: '/popular-movies' })
        })
    }
  }
}
</script>

<style lang="scss">
.link {
  text-decoration: none;
}
</style>