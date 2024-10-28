require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const qrcodeRoutes = require('./router/qrcodeRoutes');
const server = require('./database/database');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// const qrmodel = new QRModel()

// Middleware
app.use(cors()); // Allows all origins, adjust as needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/qrcode', qrcodeRoutes);

server().then(() => {
    console.log("Database Connected Successfully");
}).catch(err => {
    console.error("Database Connection Error:", err);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});