const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
const port = 4000
const { router, syncRouter, updateProduct ,deleteProduct, addProduct } = require('./routes/product');
const { order, syncorderRouter } = require('./routes/order');
const { collection, collectionSync } = require('./routes/collection');
const bodyParser = require('body-parser');
const multer = require('multer');
const path  = require('path');

// Body-parser middleware (for JSON data)
app.use(bodyParser.json());

// Multer middleware (for multipart/form-data)
const upload = multer({ dest: 'uploads/' });

const uri = "mongodb://localhost:27017";




// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
connect();

// Set up view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.render('home', { name: 'Akashdeep' });
});

// Handle POST request with file uploads
// app.post('/upload', upload.single('image'), (req, res) => {
//   // Process the uploaded file here
//   res.send('File uploaded successfully');
// });

// Use routers for different modules
app.use('/product', router);
app.use('/sync', syncRouter);
app.use('/updateProduct', updateProduct);
app.use('/deleteProduct', deleteProduct);
app.use('/addProduct', addProduct);

app.use('/order', order);
app.use('/syncOrder', syncorderRouter);
app.use('/collection', collection);
app.use('/syncCollection', collectionSync);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
