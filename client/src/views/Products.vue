<template>
    <v-container>
      <v-row>
        <v-col>
          <AddProduct/>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-list-item-title class="headline">List of Products</v-list-item-title>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Stock</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.stock }}</td>
                  <td>edit | delete</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue';

export default {
  name: 'Products',
  components: { AddProduct },
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
  },
};
</script>

<style>

</style>
