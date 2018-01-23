const keystone = require('keystone');

// Pass your keystone instance to the module
const restful = require('restful-keystone')(keystone);

// ...

exports = module.exports = function (app) {
    //Explicitly define which lists we want exposed
    restful.expose({
        Step: {
            path: "steps",
            methods: ["retrieve"],
            show: ["name", "price", "sponsor.first", "isReserved", "isSold"]
        }
    }).start();
};
