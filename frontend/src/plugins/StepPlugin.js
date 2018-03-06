'use strict';

import Vue from 'vue';

export default class StepPlugin {
    constructor(config) {
        this.config = config;
    }

    static install(_Vue, opt) {
        _Vue.prototype.$step = new StepPlugin(opt)
    }

    /**
     *
     * @param {String} id
     * @return {Promise<any>}
     */
    get(id) {
        return Vue.http.get(this.config.api + `/steps/${id}`)
            .then((response) => {
                return response.body.step;
            });
    }


    /**
     *
     * @param step
     * @param sponsor
     * @return {Promise<any>}
     */
    markAsReserved(step, sponsor) {
        return Vue.http.post(this.config.api + `/steps/${step._id}/reserve`, sponsor)
            .then((data) => {
                if (data.status !== 201) {
                    throw new Error(`Unexpected Statuscode ${data.status}`);
                }
                return null;
            });
    }

    /**
     *
     * @return {Promise<any>}
     */
    getAll() {
        return Vue.http.get(this.config.api + '/steps')
            .then((data) => {
                const steps = data.body.steps;
                steps.sort(function(a, b) {
                    if(a.step > b.step){
                        return -1
                    }

                    return 1;
                });
                return steps;
            })
    }
}
