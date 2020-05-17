<template>
    <v-container>
      <v-row>
        <v-col>
          <product-create/>
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
                  <td>
                    <v-btn class="actions" small color="success"
                      :to="{ name: 'Dashboard Products Detail', params: {id: product.id} }"
                    >View Detail</v-btn>
                    <product-update :product="product" />
                    <product-delete :product="product" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import ProductCreate from '@/components/ProductCreate.vue';
import ProductDelete from '@/components/ProductDelete.vue';
import ProductUpdate from '@/components/ProductUpdate.vue';

export default {
  name: 'Products',
  components: { ProductCreate, ProductDelete, ProductUpdate },
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
.actions {
  margin-right: 15px;
}
</style>
