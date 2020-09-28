import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueMasonry from 'vue-masonry-css';
import { preset } from 'vue-cli-plugin-vuetify-preset-shrine/preset';

Vue.use(Vuetify);
Vue.use(VueMasonry);

export default new Vuetify({ preset });
