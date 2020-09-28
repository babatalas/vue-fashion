<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto transition-fast-in-fast-out mb-16"
      color="transparent"
      :elevation="hover ? '8' : '0'"
    >
      <v-img width="100%" :src="product.imageUrls[0]">
        <v-btn
          absolute
          color="accent"
          elevation="1"
          x-large
          :style="styles.btnAddToCart"
          :ripple="{ class: 'primary--text' }"
        >
          <v-icon class="text-h5">mdi-cart-plus</v-icon>
        </v-btn>
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out v-card--reveal accent--text"
            style="height: 60px;"
          >
            Current stock: {{ product.stock }}
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-title class="justify-center">
        {{ product.name }}
      </v-card-title>
      <v-card-text class="text-center">
        <div class="subtitle-1">{{ product.price }} IDR</div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'masonryProductCardItem',
  props: {
    product: Object,
  },
  data() {
    return {
      styles: {
        btnAddToCart: {
          left: '8px',
          top: '8px',
          padding: 0,
          minWidth: '52px !important',
        },
      },
    };
  },
  mounted() {
    // console.log(this.props.product.imageUrls[0]);
  },
};
</script>

<style></style>
