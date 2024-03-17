require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserSchema = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/', (req, res) => {
  const { username, password } = req.body;
  
  // Create a new user in the database
  UserSchema.create({ username, password })
    .then(newUser => {
      console.log('New user created:', newUser);
      res.status(201).json(newUser); // Send the created user back to the client
    })
    .catch(error => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
