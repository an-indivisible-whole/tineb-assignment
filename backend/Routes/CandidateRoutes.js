const express = require('express');
const router = express.Router();
const Candidate = require('../Contracts/Candidate');

// ---------------------------------------------------
// GET: Fetch all candidates
// Route: /api/candidates
// ---------------------------------------------------
router.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ state: 1, constituency: 1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error: error.message });
  }
});

// ---------------------------------------------------
// PUT: Update a specific candidate's details
// Route: /api/updateCandidate/:id
// ---------------------------------------------------
router.put('/updateCandidate/:id', async (req, res) => {
  try {
    const candidateId = req.params.id;
    const updateData = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    res.status(200).json({ 
      message: 'Candidate updated successfully', 
      data: updatedCandidate 
    });

  } catch (error) {
    res.status(500).json({ message: 'Error updating candidate', error: error.message });
  }
});

module.exports = router;