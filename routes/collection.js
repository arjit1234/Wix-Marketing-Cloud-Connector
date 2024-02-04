const express = require('express');
const { collectionResponse } = require('../middleware/API')
const Collection = require('../models/collections')
const collection = express.Router();
const  syncCollection = express.Router();


collection.get('', async (req, res) =>{
    try {
        const collections = await Collection.find({});

        return res.render('collection/collection', { collections })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
})

syncCollection.get('', async(req, res) =>{
    try{
        const collectionResult  = await collectionResponse();

        if(!collectionResult || collectionResult.length === 0) {
            return res.redirect('/collection')
        }

        collectionResult.forEach( async (collectionData) => {
            console.log(collectionData);
            const existingCollection = await Collection.findOne({ collectionId:collectionData.id });

            if(existingCollection) {

                existingCollection.collectionName = collectionData.name;

                try {
                    await existingCollection.save();
                    console.log(`Collection with Collection id ${collectionData.id} is updated`);
                } catch (error) {
                    console.log(`Collection with collectionId ${collectionData.id} not updated ${error.message}`);
                }
            } else {
                const collection = new Collection({
                    collectionId: collectionData.id,
                    collectionName: collectionData.name
                })

                try {
                    await collection.save();
                    console.log(`Collection with collection id ${collectionData.id} is saved`);
                } catch(error) {
                    console.log(`Collection with collection id ${collectionData.id} is not saved ${error.message}`)
                }
            }
        });
        
        return res.redirect('/collection');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = {
   collectionSync : syncCollection,
   collection : collection
}

