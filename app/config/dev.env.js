'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SLUG: '"dev-vs-stairs"',
  API_URL: '"https://api.cosmicjs.com/v1/dev-vs-stairs"',
  API_KEY_READ: '"JoTheAarX0v2nIrHhfIL0qv6L5YKqBKaBxqeKdPxHTCQQ1EIjp"',
  API_KEY_WRITE: '"2xdEjFLpEJcUZ3z7UX5wLo14DLtdXZaZ78RafGO1PcY0KtRRL0"',
});
