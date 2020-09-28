<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawerRight" app clipped right>
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="accent"></v-app-bar-nav-icon> -->
    <v-app-bar app clipped-right color="primary" flat v-if="isMobile" elevate-on-scroll>
      <v-toolbar-title class="accent--text">
        <v-icon x-large color="accent">mdi-diamond-stone</v-icon>
        VUE FASHION
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon> -->
      <v-btn active-class="btn__shrine" text to="/">
        Featured
      </v-btn>
      <v-btn active-class="btn__shrine" text to="/apartement">
        Apartment
      </v-btn>
      <v-btn text>
        Accessories
      </v-btn>
      <v-btn text>
        Shoes
      </v-btn>
      <v-btn text>
        Tops
      </v-btn>
      <v-btn text>
        Bottoms
      </v-btn>
      <v-btn text>
        Dressess
      </v-btn>
      <v-icon color="accent">mdi-power-on</v-icon>
      <v-btn text>
        My Account
      </v-btn>
      <v-btn icon color="accent">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="primary" floating>
      <v-sheet
        color="primary"
        class="d-flex flex-column align-center justify-space-between py-16"
        :style="[fullHeight, insetShadow]"
      >
        <v-list class="text-center">
          <v-list-item class="flex-column align-center">
            <v-icon x-large color="accent">mdi-diamond-stone</v-icon>
            <v-list-item-content>
              <v-list-item-title :style="[sidebarTitle]" color="accent">
                VUE FASHION
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="text-center accent--text">
          <v-list-item to="/" active-class="btn__shrine">
            <v-list-item-content>
              <v-list-item-title>Featured</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/apartement" active-class="btn__shrine">
            <v-list-item-content>
              <v-list-item-title>Apartement</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Accessories</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Shoes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Tops</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Bottoms</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dressess</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>My Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="text-center">
          <v-list-item>
            <v-btn icon color="accent">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-sheet>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" fixed temporary></v-navigation-drawer>

    <v-main>
      <!-- :style="{ background: 'linear-gradient(135deg, transparent 44px, white 0)' }" -->
      <div :style="[fullHeight, isMobile && mobileWrapper]">
        <v-sheet
          :style="[fullHeight, isMobile && contentClipPath]"
          class="px-4 py-16 px-lg-16 py-lg-12"
          color="white"
        >
          <v-container fluid>
            <masonry
              :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }"
              :gutter="{ default: '30px', 700: '15px' }"
            >
              <div v-for="(item, index) in products" :key="index">
                <ProductCardItem :product="item" />
              </div>
            </masonry>
          </v-container>
        </v-sheet>
      </div>
    </v-main>

    <v-footer app color="white">
      <span>Vue-Fashion inspired by Shrine Material Design</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import AppAlert from '@/components/AppAlert.vue';
// import AppFooter from '@/components/AppFooter.vue';

import ProductCardItem from '@/components/masonry/ProductCardItem.vue';

const mdiTriangleOutline = require('./assets/icons/triangle-outline.svg');

// 'drop-shadow(0px 11px 15px -7px rgba(0, 0, 0, 0.2)),
// drop-shadow(0px 24px 38px 3px rgba(0, 0, 0, 0.14)),
// drop-shadow(0px 9px 46px 8px rgba(0, 0, 0, 0.12)) !important)',

export default {
  name: 'App',
  components: {
    // AppAlert,
    // AppFooter,
    ProductCardItem,
  },
  data: () => ({
    //
    drawer: null,
    left: false,
    containerId: 'masonry-grid',
    fullHeight: {
      height: '100%',
    },
    desktopWrapper: {
      // paddingLeft: '8px',
    },
    mobileWrapper: {
      filter: 'drop-shadow(-8px -4px 4px rgba(0, 0, 0, 0.15))',
      marginTop: '16px',
    },
    contentClipPath: {
      clipPath: 'polygon(44px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 44px)',
    },
    insetShadow: {
      boxShadow: 'inset -8px 0px 10px -8px rgba(0, 0, 0, 0.2)',
    },
    sidebarTitle: {
      fontSize: '1.2rem',
      fontWeight: '500',
    },
    icons: {
      mdiTriangleOutline,
    },
    products: [
      {
        name: 'Ginger scarf',
        description:
          'Scarves keep you warm.  Yes, a  practical purpose! Even a lightweight synthetic around your neck will keep you comfortable when it’s breezy –  indoors or out.',
        stock: 29,
        price: 190000,
        imageUrls: [
          'https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Fginger-scarf.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blue stone mug',
        description:
          'The Grey Stone mug from House Doctor will add some rustic style to the table. The attractive mug is dishwasher and microwave safe.',
        stock: 35,
        price: 129000,
        imageUrls: [
          'https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Fblue-stone-mug.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cerise scallop tee',
        description: [
          'Details, A delicately scalloped neckline and elbow-length sleeves bring a graceful touch to our superbly soft pima cotton tee.',
        ],
        stock: 29,
        price: 109000,
        imageUrls: [
          'https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Fcerise-scallop.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chambray napkins',
        description:
          'Ultra-soft cotton chambray Montgomery napkins, cocktail napkins, and placemats are finished with with coordinating tonal lettuce edging.',
        stock: 20,
        price: 129000,
        imageUrls: [
          'https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Fchambray-napkins.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fine lines tee',
        description:
          'A slightly different take on a classic striped jersey top, the 100% cotton Rae Top from AND/OR comes with ruffle sleeves adding just a hint of girly appeal.',
        stock: 30,
        price: 89000,
        imageUrls: ['https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Ffine-lines.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gatsby hat',
        description:
          'The homburg is a truly iconic style, more commonly worn in a formal setting, but can also be matched with a more casual attire.',
        stock: 40,
        price: 139000,
        imageUrls: ['https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Fgatsby-hat.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vagabond sack',
        description:
          'Urban style backpack made of black calfskin. The backpack has a comfortable external pocket that closes via a matte black waterproof zip. ',
        stock: 24,
        price: 159000,
        imageUrls: [
          'https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Fvagabond-sack.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Walter henley (white)',
        description:
          'Update your basics wardrobe with practical pieces like this top from Huga. Its solid color fabric is styled with a Henley placket.',
        stock: 10,
        price: 149000,
        imageUrls: [
          'https://cdn.glitch.com/a597fe3a-1724-4fcf-8d0c-3a7d4f205d93%2Fwalter-henley.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  }),
  created() {
    this.$store.dispatch('userInit');
  },
  mounted() {
    console.log(this.$vuetify.breakpoint.mobile);
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
  overflow: hidden;
  background-color: #fedbd0;
  text-overflow: ellipsis;
}

.btn__shrine {
  background-color: #fedbd0;
  /* background-repeat: no-repeat;
  background-position: center;
  background-size: contain; */
}

.btn__shrine::before {
  background-color: red;
  -webkit-mask: url(./assets/icons/triangle-outline.svg) no-repeat 50% 50%;
  mask: url(./assets/icons/triangle-outline.svg) no-repeat 50% 50%;
  mask-size: contain;
  -webkit-mask-size: contain;
}
</style>
