<template>
  <v-card tile flat>
    <v-app-bar tile flat color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vue Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn light color="white" @click.prevent="userLogout">
        <span>Logout</span>
        <v-icon right>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="deep-purple" dark>
      <v-list nav>
        <v-list-item-group
          active-class="white--text text--accent-4"
        >
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-flag</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Campigns</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click.prevent="userLogout" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    drawer: false,
    links: [
      {
        icon: 'mdi-view-dashboard',
        text: 'Dashboard',
        route: '/admin/overview',
      },
      {
        icon: 'mdi-view-list',
        text: 'Products',
        route: '/admin/products',
      },
      // {
      //   icon: 'mdi-flag',
      //   text: 'Campigns',
      //   route: '/admin/campigns',
      // },
    ],
  }),
  methods: {
    userLogout() {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push({ name: 'Login' });
          this.$store.dispatch('showAlert', {
            snackbar: true,
            message: 'See you soon :)',
            type: 'success',
          });
        });
    },
  },
};
</script>

<style>

</style>
