const express = require('express');
const router = express.Router();

const SpellService = require('../services/SpellList')

// router.use(require('./product-image'))

router.post('/get-list', async function (req, res) {
    const filters = req.body.filters
    const serviceRes = await SpellService.getFilteredList(filters)

    res.status(200).send(serviceRes)
})

router.post('/add-spell', async function (req, res) {
    const spell = req.body.spell

    const serviceRes = await SpellService.addSpell(spell)

    res.status(200).send(serviceRes)
})


module.exports = router;
