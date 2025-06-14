const express = require('express');
const router = express.Router();
const POI = require('../models/POI');

router.get('/', async (req, res) => {
  try {
    const pois = await POI.find();
    res.json(pois);
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;