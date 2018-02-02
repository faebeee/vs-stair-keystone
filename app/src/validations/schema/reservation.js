'use strict';

import Joi from 'joi';

export default Joi.object().keys({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email()
});
