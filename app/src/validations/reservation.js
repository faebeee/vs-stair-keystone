'use strict';
import Joi from 'joi';
import Schema from './schema/reservation';

export default function (firstname, lastname, email) {
  const result = Joi.validate({
    firstname: firstname,
    lastname: lastname,
    email: email
  }, Schema);

  return result;
}
