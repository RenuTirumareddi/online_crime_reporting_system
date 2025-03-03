const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  crimeType: { type: String, required: true },
  description: { type: String, required: true }, 
  location: { type: String, required: true }, 
  time: { type: Date, default: Date.now }, 
  status: {
    type: String,
    enum: ['Pending', 'Under Investigation', 'Resolved'],
    default: 'Pending',
  }, 
  officerAssigned: { type: Schema.Types.ObjectId, ref: 'User' }, 
  evidence: [{ type: String }], 
});

module.exports = mongoose.model('Report', reportSchema);
