require('dotenv').config();
const mongoose = require('mongoose');

// Schéma POI (adapte si tu as déjà un modèle)
const poiSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  lat: Number,
  lng: Number,
  address: String
});

const POI = mongoose.model('POI', poiSchema);

// Tes données fictives (extrait, tu peux coller les 20 POIs ici)
const pois = [
  {
    name: "Blanc SARL",
    description: "Observer un mieux tromper haut répéter.",
    type: "Mobilité",
    lat: 50.835143,
    lng: 4.356251,
    address: "chemin Klein, 67094 Carpentier"
  },
  {
    name: "Morel Lecomte S.A.S.",
    description: "Rouge déposer flamme.",
    type: "Culture",
    lat: 50.863748,
    lng: 4.345925,
    address: "81, avenue de Faure, 98875 Humbert-sur-Morel"
  },
  {
    name: "Rivière S.A.S.",
    description: "Donner mesure cesser premier spectacle dernier grandir.",
    type: "Éducation",
    lat: 50.87009,
    lng: 4.334508,
    address: "10, boulevard de Navarro, 05288 Gonzaleznec"
  },
  {
    name: "Bertrand",
    description: "Queue note parcourir social problème on.",
    type: "Emploi",
    lat: 50.864662,
    lng: 4.334825,
    address: "19, avenue de Bourdon, 33283 Saint Emmanuel"
  },
  {
    name: "Martin",
    description: "Dessiner quartier plaindre règle ne haut dernier paysage.",
    type: "Emploi",
    lat: 50.8318,
    lng: 4.370681,
    address: "51, avenue Roger Vallet, 76562 Sainte Philippenec"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB');

    await POI.deleteMany(); // Supprime les anciens POIs si tu veux
    await POI.insertMany(pois);
    console.log('✅ Données insérées avec succès');

    process.exit();
  } catch (err) {
    console.error('❌ Erreur lors du seed :', err);
    process.exit(1);
  }
}

seedDatabase();
