// Fundamental setup
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

// Middleware
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbzua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        // basic formation
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('services');

        // to get data
        app.get('/service', async(req, res)=>{
            const query = {};
        const cursor = serviceCollection.find(query)
        const services = await cursor.toArray()
        res.send(services)
        })

        // to get one single data
        app.get('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const SingleService = await serviceCollection.findOne(query)
            res.send(SingleService);
        })

        // insert or add a service
        app.post('/service', async(req, res)=>{
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })

        // delete a service
        app.delete('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await serviceCollection.deleteOne(query)
            res.send(result);
        })


    } finally{

    }
}

run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send('genius backend runnig')
})

app.listen(port, ()=>{
    console.log('port listenig', port);
})