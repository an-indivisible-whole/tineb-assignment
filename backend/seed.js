const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Candidate = require('./Contracts/Candidate');
const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", MONGO_URI);
const csvFilePath = path.join(__dirname, 'Assessment.csv');

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI, {
      dbName: 'Stakeholders' // This forces Mongoose to use this specific database
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing records to ensure a fresh sync
    await Candidate.deleteMany({});
    console.log('🗑️  Cleared existing candidates from the database');

    const candidatesToInsert = [];

    console.log('Parsing CSV file items...');
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // Map the exact CSV headers to your MongoDB schema fields
        candidatesToInsert.push({
          slNo: row['Sl.No.'] ? parseInt(row['Sl.No.'].trim(), 10) : null,
          candidateName: row['Name'] ? row['Name'].trim() : '',
          party: row['Party'] ? row['Party'].trim() : 'Independent',
          constituency: row['Constituency'] ? row['Constituency'].trim() : '',
          state: row['State'] ? row['State'].trim() : '',
          status: row['Status'] ? row['Status'].trim() : '',
          lokSabhaTerms: row['Lok Sabha Terms'] ? row['Lok Sabha Terms'].trim() : '',
          phone: row['Phone'] ? row['Phone'].trim() : '',
          email: row['Email'] ? row['Email'].trim() : ''
        });
      })
      .on('end', async () => {
        try {
          // Perform a batch insert for optimal performance
          await Candidate.insertMany(candidatesToInsert);
          console.log(`🎉 Success! Loaded ${candidatesToInsert.length} enriched records into MongoDB!`);
        } catch (insertError) {
          console.error('❌ Error inserting records during sync:', insertError);
        } finally {
          mongoose.connection.close();
          console.log('🔌 Database connection closed.');
          process.exit(0);
        }
      });

  } catch (connectionError) {
    console.error('❌ Fatal connection error:', connectionError);
    process.exit(1);
  }
}

seedDatabase();