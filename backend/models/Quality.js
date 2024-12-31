const mongoose = require('mongoose');


const QualitySchema = new mongoose.Schema({
    inspectionDate: Date,
    result: String,
    defectNotes: String,
});
const Quality = mongoose.model('Quality', QualitySchema);

module.exports = Quality;