'use strict';
// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import MCC from 'materialize-css/dist/js/materialize.min';
import Vuex from 'vuex';

import App from './App.vue'
import SponsorPlugin from './plugins/SponsorPlugin';
import StepPlugin from './plugins/StepPlugin';
import router from './router';
import Errormessage from '@/components/error-message/error-message.vue';
import Loader from '@/components/loader/loader.vue';
import store from '@/store';

Raven
    .config('https://d31558ead7cb4e55b29275efef15e541@sentry.io/276417')
    .addPlugin(RavenVue, Vue)
    .install();

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueI18n);
Vue.use(VueRouter);


Vue.use(SponsorPlugin);
Vue.use(StepPlugin, {
    api: 'https://vs-stair-prod.herokuapp.com/api'
    //api: 'https://vs-stair-dev.herokuapp.com/api'
});

Vue.component('loader', Loader);
Vue.component('error-message', Errormessage);

Vue.config.lang = 'de';


const i18n = new VueI18n({
    locale: Vue.config.lang,
    messages: {
        de: require('./language/de.json')
    }
});

new Vue({
    el: '#app',
    i18n,
    store,
    router,
    render: (h) => h(App)
});
