const express = require('express');
const connect = require('./config/db');
const path = require('path');
const app = express();

// connect db
connect();

// middleware
app.use(express.json({ extended: false }));

// routes
app.use('/auth/', require('./routes/auth'));
app.use('/user/', require('./routes/user'));

if (process.env.NODE_ENV === 'production') {
  // server static assets
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'frontend', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server connected'));
