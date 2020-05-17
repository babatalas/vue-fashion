<template>
  <v-app>
    <v-content>
      <Alert/>
      <router-view/>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Alert from '@/components/Alert.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Alert,
  },
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('userInit');
  },
  mounted() {
  },
  computed: {
  },
};
</script>
