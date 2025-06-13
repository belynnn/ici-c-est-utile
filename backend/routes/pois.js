const router = express.Router();
const verify = require('../middlewares/verify.js');
const express = require('express');
const POI = require('../models/POI');

// Lire tous les POIs
router.get('/', async (req, res) => {
  const pois = await POI.find();
  res.json(pois);
});

// Ajouter un POI
router.post('/', verify, async (req, res) => {
  const { lat, lng, type, description } = req.body;

  try {
    const poi = await POI.create({
      lat,
      lng,
      type,
      description,
      owner: req.user.id, // ajouté automatiquement par le middleware
    });
    res.status(201).json(poi);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
});

module.exports = router;