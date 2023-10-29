const express = require('express');
const multer = require('multer'); // Middleware for handling file uploads
const path = require('path');

const app = express();

// Configure the file storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/upload', upload.single('document'), (req, res) => {
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'upload-success.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
