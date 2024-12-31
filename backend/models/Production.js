const mongoose = require('mongoose');


const ProductionSchema = new mongoose.Schema({
    material: String,
    status: String,
    quantity: Number,
});

const Production = mongoose.model('Production', ProductionSchema);

module.exports = Production;