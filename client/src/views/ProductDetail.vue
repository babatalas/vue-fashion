<template>
  <v-container>
    <v-row>
      <v-col>
        {{this.$route.params.id}}
      </v-col>
      <v-col>
        {{product}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'product-detail',
  methods: {
  },
  computed: {
    product() {
      return this.$store.state.products.find((el) => el.id === parseInt(this.$route.params.id, 10));
    },
  },
};
</script>

<style>

</style>
