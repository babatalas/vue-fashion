<template>
  <v-dialog max-width="640px" v-model="dialog">
    <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Add new product
        </v-btn>
      </template>
    <v-card>
      <v-card-title><span class="headline">Add a New Product</span></v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addProduct" ref="productForm">
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
          <v-btn type="submit" :loading="loading" class="success">Save Product</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      product: {
        name: '',
        nameRules: [
          (v) => !!v || 'Product name is required',
          (v) => v.length >= 3 || 'Product name must be 3 or more characters',
        ],
        description: '',
        descriptionRules: [
          (v) => !!v || 'Product description is required',
          (v) => v.length >= 10 || 'Product description must be 10 or more characters',
        ],
        stock: 0,
        stockRules: [
          (v) => !!v || 'Total stock is required',
          (v) => v > 0 || 'Total stock must be greater than 0',
        ],
        price: 0,
        priceRules: [
          (v) => !!v || 'Product price is required',
          (v) => v > 1000 || 'Product price must be greater than 1000',
        ],
        imageUrl: '',
        imageRules: [
          (v) => !!v || 'Product image url is required',
          (v) => /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(v) || 'Product image url be valid',
        ],
      },
      loading: false,
      dialog: false,
    };
  },
  methods: {
    addProduct() {
      if (this.$refs.productForm.validate()) {
        console.log(this.product);
        this.loading = true;
        this.$store.dispatch('addProduct', this.product)
          .then((product) => {
            this.dialog = false;
            this.$store.dispatch('showAlert', {
              message: `${product.name} add successfully`,
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
        console.log('snackbar');
        this.$store.dispatch('showAlert', { message: 'Correct your form fields', type: 'error', snackbar: true });
      }
    },
  },
};
</script>

<style>

</style>
