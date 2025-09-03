// Express backend for Clerk authentication
// Add your Clerk secret key in .env as CLERK_SECRET_KEY

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Clerk webhook endpoint (example)
app.post('/clerk/webhook', (req, res) => {
  // TODO: Validate Clerk webhook signature
  // Access event data from req.body
  res.status(200).send('Webhook received');
});

// Session validation endpoint (example)
app.post('/clerk/validate-session', (req, res) => {
  // TODO: Validate Clerk session using CLERK_SECRET_KEY
  // Access session token from req.body.sessionToken
  res.status(200).json({ valid: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
