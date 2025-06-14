require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const poisRoutes = require('./routes/pois');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB Atlas réussie"))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// Routes
app.use('/api/pois', poisRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
