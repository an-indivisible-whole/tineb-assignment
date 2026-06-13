const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  slNo: { type: Number },
  candidateName: { type: String, required: true },
  party: { type: String, default: 'Independent' },
  constituency: { type: String, required: true, index: true },
  state: { type: String, required: true, index: true },
  status: { type: String },
  lokSabhaTerms: { type: String },
  phone: { type: String },
  email: { type: String }
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;