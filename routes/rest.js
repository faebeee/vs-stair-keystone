'use strict';

const keystone = require('keystone');
const restful = require('restful-keystone')(keystone);

module.exports = function () {
    restful.expose({
        Step: {
            methods: ["retrieve"],
            show: ['name', 'price', 'sponsor', 'isSold', 'isReserved']
        },
    }).start();
};
