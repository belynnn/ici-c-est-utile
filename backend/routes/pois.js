import verify from '../middlewares/verify.js';

const router = express.Router();
const express = require('express');
const POI = require('../models/POI');
const jwt = require('jsonwebtoken');

// Middleware d'auth
const verify = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Non autorisé' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = decoded;
    next();
  });
};

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