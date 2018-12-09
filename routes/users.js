const app = require('express')
const { User, validateUser } = require('../models/user');

const router = app.Router();

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (await User.findOne({ email: req.body.email} )) {
        return res.status(400).send(`${req.body.email} is already registered`);
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const result = await user.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

module.exports = router;