<template>
  <v-dialog max-width="640px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="actions" color="primary" small v-on="on">Edit</v-btn>
    </template>
    <v-card>
      <v-card-title><span class="headline">Edit Product</span></v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateProduct" ref="productForm">
          <v-text-field label="Product Name" v-model="product.name"
            prepend-icon="mdi-file-edit" :rules="product.nameRules"
          >
          </v-text-field>
          <v-textarea v-model="product.description" label="Product Description"
            prepend-icon="mdi-file-document-edit" :rules="product.descriptionRules"
          >
          </v-textarea>
          <v-text-field label="Product Price" v-model="product.price"
            prepend-icon="mdi-cash-usd" type="number" :rules="product.priceRules"
          >
          </v-text-field>
          <v-text-field label="Product Stock" v-model="product.stock"
            prepend-icon="mdi-bank-plus" type="number" :rules="product.stockRules"
          >
          </v-text-field>
          <v-text-field label="Product Image Url" v-model="product.imageUrl"
            prepend-icon="mdi-file-image" :rules="product.imageRules"
          >
          </v-text-field>
          <v-btn type="submit" :loading="loading" class="success">Update Product</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'product-update',
  props: ['product'],
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  methods: {
    updateProduct() {
      if (this.$refs.productForm.validate()) {
        console.log(this.product);
        this.loading = true;
        this.$store.dispatch('updateProduct', this.product)
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
      } else {
        this.$store.dispatch('showAlert', { message: 'Correct your form fields', type: 'error', snackbar: true });
      }
    },
  },
};
</script>

<style>

</style>
