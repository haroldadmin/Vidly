const app = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');

const router = app.Router();

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send(`${req.body.email} is already registered`);
    }
    const user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.generateAuthToken();

    try {
        const result = await user.save();
        res.header("x-auth-token", token).send(_.pick(result, ["_id", "name", "email"]));
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

module.exports = router;