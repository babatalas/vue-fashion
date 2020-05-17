import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:5000',
    alert: {
      snackbar: false,
      message: '',
      type: 'success',
    },
    products: [],
    user: {},
  },
  mutations: {
    getProducts(state, payload) {
      state.products = payload.data;
    },
    showAlert(state, payload) {
      console.log(state.alert);
      state.alert = payload;
      console.log(state.alert);
    },
    userInit(state, user) {
      state.user = user || {};
    },
    userLogin(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    userLogout(state) {
      state.user = {};
      localStorage.clear();
    },
  },
  actions: {
    getProducts(context) {
      Axios({
        url: `${this.getters.apiUrl}/products`,
        // url: 'http://localhost:5000/products',
        method: 'get',
      })
        .then(({ data }) => {
          console.log(data);
          context.commit('getProducts', data);
        })
        .catch((err) => console.log(err));
    },
    addProduct(context, payload) {
      Axios({
        method: 'post',
        url: `${this.getters.apiUrl}/products`,
      });
      console.log({ context, payload });
    },
    showAlert(context, payload) {
      context.commit('showAlert', payload);
    },
    userInit({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      commit('userInit', user);
    },
    userLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'post',
          url: `${this.getters.apiUrl}/login`,
          data: { ...payload },
        })
          .then(({ data }) => {
            commit('userLogin', data);
            resolve(data);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    userLogout({ commit, state }) {
      commit('userLogout');
      return new Promise((resolve, reject) => {
        if (state.user.email) {
          reject();
        } else {
          resolve();
        }
      });
    },
  },
  getters: {
    apiUrl: (state) => state.apiUrl,
    alert: (state) => state.alert,
    user: (state) => state.user,
    products: (state) => state.products,
  },
  modules: {
  },
});
