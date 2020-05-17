import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // apiUrl: 'http://localhost:5000',
    apiUrl: 'https://eko8-ecommerce-cms.herokuapp.com',
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
    addProduct(state, payload) {
      state.products.push(payload);
    },
    updateProduct(state, payload) {
      const products = state.products.filter((p) => p.id !== payload.id);
      state.products = products;
      state.products.push(payload);
    },
    deleteProduct(state, payload) {
      const products = state.products.filter((p) => p.id !== payload.id);
      state.products = products;
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
      return new Promise((resolve, reject) => {
        Axios({
          method: 'post',
          url: `${this.getters.apiUrl}/products`,
          headers: {
            access_token: context.state.user.access_token,
          },
          data: {
            ...payload,
          },
        })
          .then(({ data }) => {
            context.commit('addProduct', data.data);
            resolve(data.data);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    updateProduct(context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'put',
          url: `${this.getters.apiUrl}/products/${payload.id}`,
          headers: {
            access_token: context.state.user.access_token,
          },
          data: {
            ...payload,
          },
        })
          .then(({ data }) => {
            context.commit('updateProduct', data.data);
            resolve(data.data);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    deleteProduct(context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'delete',
          url: `${this.getters.apiUrl}/products/${payload.id}`,
          headers: {
            access_token: context.state.user.access_token,
          },
        })
          .then(({ data }) => {
            context.commit('deleteProduct', data.data);
            resolve(data.data);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
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
    productById: (state) => (id) => state.products.find((el) => el.id === id),
  },
  modules: {
  },
});
