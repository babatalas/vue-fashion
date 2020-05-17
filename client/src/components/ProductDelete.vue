<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn small color="error" dark v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">{{ product.name }}</v-card-title>
      <v-card-text>Are you sure want to delete this product?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="dialog = false">Cancel</v-btn>
        <v-btn :loading="loading" color="error" @click="deleteProduct">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'product-delete',
  props: ['product'],
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  methods: {
    deleteProduct() {
      this.loading = true;
      this.$store.dispatch('deleteProduct', this.product)
        .then((product) => {
          this.dialog = false;
          this.$store.dispatch('showAlert', {
            message: `${product.name} updated successfully`,
            type: 'success',
            snackbar: true,
          });
        })
        .catch((err) => {
          this.dialog = false;
          this.$store.dispatch('showAlert', {
            message: err.errorCode,
            type: 'error',
            snackbar: true,
          });
        });
    },
  },
};
</script>

<style>

</style>
