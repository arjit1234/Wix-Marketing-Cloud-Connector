const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 400;
const {router,syncRouter} = require('./routes/product')
const { order,syncorderRouter } = require('./routes/order')
const {  collection, collectionSync } = require('./routes/collection')


const uri = "mongodb://localhost:27017";
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

//Product router
app.use('/product', router);
app.use('/sync', syncRouter);

//Order Router
app.use('/order', order);
app.use('/syncOrder', syncorderRouter);

//Category Router
app.use('/collection', collection);
app.use('/syncCollection', collectionSync);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})