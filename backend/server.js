const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Production = require('./models/Production');
const Quality = require('./models/Quality');
const PORT = process.env.PORT || 5000;



const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Production');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// CRUD for Production
app.post('/api/production', async (req, res) => {
  try {
    const newProduction = new Production(req.body);
    await newProduction.save();
    res.json({success:true,newProduction});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/production', async (req, res) => {
  try {
    const productions = await Production.find();
    res.json({success:true,data:productions});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CRUD for Quality Control
app.post('/api/quality', async (req, res) => {
  try {
    const newQuality = new Quality(req.body);
    await newQuality.save();
    res.json({success:true,newQuality});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/quality', async (req, res) => {
  try {
    const qualityInspections = await Quality.find();
    res.json({success:true,data:qualityInspections});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

