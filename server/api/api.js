const express = require('express');
const router = express.Router();
const subControllers = require('../controllers/subControllers.js');

router.delete('/deletesub/:id', subControllers.deleteSub, (req, res) => {
    res.status(200).json(res.locals.deleteSub);
})

router.get('/:id', subControllers.getSub, (req, res) => {
    res.status(200).json(res.locals.getSub);
})

module.exports = router;

