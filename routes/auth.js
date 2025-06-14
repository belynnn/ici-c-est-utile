const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed });
    res.json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(400).json({ error: 'Email déjà utilisé' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Email inconnu' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Mot de passe incorrect' });

  // Expiration
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // expire dans 7 jours
  );

  res.json({ token });
});

module.exports = router;
