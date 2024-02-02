const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 400;
const router = require('./routes/product');


const uri = "mongodb+srv://arjit:root@cluster0.oxyudxb.mongodb.net/";
async function connect() {
  try{
    await mongoose.connect(uri);
    console.log("Connected to MongoDb")
  }catch (error) {
    console.log(error)
  }
}
connect();
app.set('views','views');
app.set('view engine','ejs');
app.get('/', (req, res) => { 
    res.render('home', { name: 'Akashdeep' }); 
}); 

app.use('/product/',router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})