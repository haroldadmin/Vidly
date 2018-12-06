const app = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const Customer = require('../db/models').Customer;

const router = app.Router();

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
});

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (customer) {
        res.send(customer)
    } else {
        res.status(404).send("A customer with the given ID could not be found");
    }
});

module.exports = router;