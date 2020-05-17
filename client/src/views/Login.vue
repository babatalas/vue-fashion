<template>
  <v-form @submit.prevent="login" cols="12" sm="12" class="grey lighten-4">
    <v-container>
      <v-row>
        <v-col md="4"
        offset-md="4">
          <v-list-item-title class="headline mb-1">Login Form</v-list-item-title>
        </v-col>
        <v-col md="4"
        offset-md="4">
          <v-text-field v-model="newUser.email" type="email" label="E-mail" required
            prepend-icon="mdi-email"
          ></v-text-field>
        </v-col>
        <v-col md="4"
        offset-md="4">
          <v-text-field v-model="newUser.password" prepend-icon="mdi-key"
            :type="showPassword ? 'text' : 'password'" label="Password" required
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
        </v-col>
        <v-col md="4"
        offset-md="4">
          <v-btn depressed color="primary" type="submit">Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      newUser: {
        email: '',
        password: '',
      },
      showPassword: false,
    };
  },
  methods: {
    login() {
      this.$store.dispatch('userLogin', this.newUser)
        .then((data) => {
          this.newUser = { email: '', password: '' };
          this.$router.push({ name: 'Dashboard Overview' });
          this.$store.dispatch('showAlert', {
            snackbar: true,
            message: `Welcome home ${data.firstName}!`,
            type: 'success',
          });
        })
        .catch((err) => {
          this.$store.dispatch('showAlert', {
            snackbar: true,
            message: `${err.errorCode}`,
            type: 'error',
          });
        });
    },
  },
  created() {
    if (this.user.email) {
      this.$router.push({ name: 'Dashboard Overview' });
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    alert() {
      return this.$store.getters.alert;
    },
  },
};
</script>

<style>

</style>
