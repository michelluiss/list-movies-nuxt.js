<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      v-if="showHeader"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Popular Movies',
          to: '/popular-movies'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'List Movies',
          to: '/list-movies'
        }
      ],
      miniVariant: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    showHeader() {
      return this.$route.path !== '/'
    }
  },
  created() {
    const request_token = JSON.parse(localStorage.getItem('request_token'))
    const session_id = JSON.parse(localStorage.getItem('session_id'))
    if (request_token && session_id) this.$store.dispatch('setAuthorization')
    else (this.$router.push({ path: '/' }))
  }
}
</script>
