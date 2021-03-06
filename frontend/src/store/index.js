'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        step: 0
    },

    mutations: {
        setStep(state, step) {
            state.step = step;
        }
    }
});
