const app = require('express');
const auth = require('../middleware/auth');
const { Customer, validateCustomer } = require('../models/customer');

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

router.post("/", auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    const result = await customer.save();
    res.send(result);
})

router.put("/:id", auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }, { new: true });
        if (!customer) return res.status(404).send("A course with the given ID could not be found.")
        return res.send(customer);
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID");
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete(req.params.id);
        if (!result) res.status(404).send("A course with the given ID could not be found");
        return res.send(result);
    } catch (ex) {
        if (ex.name === "CastError") res.status(400).send("Invalid ID");
    }
})

module.exports = router;