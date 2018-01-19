const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Step = new keystone.List('Step');

Step.add({
	name: {type: Types.Text, required: true, index: true},
	price: {type: Types.Number, required: true, initial: true},
	sponsor: {type: Types.Name},
	sponsor_email: {type: Types.Email},
	isReserved: {type: Types.Boolean},
	isSold: {type: Types.Boolean},
});

/**
 * Registration
 */
Step.defaultColumns = 'name, price';
Step.register();
