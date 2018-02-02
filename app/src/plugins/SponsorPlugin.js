'use strict';

import Vue from 'vue';
import {v4} from 'uuid';
import Cosmic from 'cosmicjs';

export default class SponsorPlugin {
  constructor(config) {
    this.config = config;
  }

  static install(_Vue, opt) {
    _Vue.prototype.$sponsor = new SponsorPlugin(opt);
  }

  create(firstname, lastname, email) {
    const params = {
      write_key: this.config.bucket.write_key,
      type_slug: 'sponsors',
      title: email,
      slug: v4()
    };

    return new Promise((res, rej) => {
      Cosmic.addObject(this.config, params, (error, response) => {
        if(error){
          return rej(error);
        }
        return res(response.object);
      });
    })
  }
}
