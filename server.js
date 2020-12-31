const express = require('express');
const connect = require('./config/db');
const app = express();

// connect db
connect();

// middleware
app.use(express.json({ extended: false }));

// routes
app.use('/auth/', require('./routes/auth'));
app.use('/user/', require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server connected'));
