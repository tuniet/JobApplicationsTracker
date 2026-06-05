const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company:     { type: String, required: true, trim: true },
  position:    { type: String, required: true, trim: true },
  status:      {
    type: String,
    enum: ['wishlist', 'applied', 'interview', 'offer', 'rejected'],
    default: 'applied',
  },
  url:         { type: String },
  notes:       { type: String },
  appliedAt:   { type: Date },
  favourite:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
