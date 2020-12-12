<template>
  <div class="videos">
    <iframe
      :width="width"
      :height="height"
      :src="`https://www.youtube.com/embed/${keyVideo}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'Videos',
  props: {
    width: {
      type: String,
      default: '560'
    },
    height: {
      type: String,
      default: '315'
    },
    keyVideo: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  created() {
  }
}
</script>
