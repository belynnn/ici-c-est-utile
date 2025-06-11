const express = require('express');
const router = express.Router();
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

router.get('/', async (req, res) => {
  const pois = await POI.find();
  res.json(pois);
});

router.post('/', verify, async (req, res) => {
  const { lat, lng, type, description } = req.body;
  const poi = await POI.create({ lat, lng, type, description, owner: req.user.id });
  res.json(poi);
});

module.exports = router;
