const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(2).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean().default(false)
    }
    return Joi.validate(customer, schema);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;