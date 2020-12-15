<template>
  <v-card outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{list.name}}
          <v-badge :content="list.item_count" color="red"></v-badge>
        </v-list-item-title>
        <v-list-item-subtitle>{{list.description}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <NuxtLink :to="`/list/${list.id}`" class="link">
        <v-btn color="red">
          View list
        </v-btn>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardList',
  props: {
    list: {
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