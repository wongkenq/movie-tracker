const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/users');

const checkJwt = auth({
  audience: process.env.AUDIENCE || 'http://localhost:9000',
  issuerBaseURL: 'https://dev-yi7wxr1jbz07puck.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

dotenv.config();
const port = process.env.PORT || 9001;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/', checkJwt, todoRoutes);
app.use('/', userRoutes);

app.listen(port, () => console.log(`Connected to server on port ${port}.`));
