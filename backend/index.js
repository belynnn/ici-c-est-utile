require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const poisRoutes = require('./routes/pois');

const allowedOrigins = [
  'http://localhost:5173',
  'https://ici-c-est-utile.vercel.app',
];

const app = express();
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB Atlas réussie"))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// Routes
app.use('/api/pois', poisRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
