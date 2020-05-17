<template>
  <v-snackbar v-model="alert.snackbar" top :color="alert.type">
    <span>{{ alert.message }}</span>
    <v-btn text color="white">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Alert',
  data() {
    return {
    };
  },
  computed: {
    alert: {
      get() {
        return this.$store.state.alert;
      },
    },
  },
};
</script>

<style>

</style>
