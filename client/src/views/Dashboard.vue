<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Dashboard',
  components: {
    Navbar,
  },
  methods: {
  },
  created() {
    if (this.user.email) {
      this.$store.dispatch('getProducts');
    } else {
      this.$router.push({ name: 'Login' });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>

</style>
