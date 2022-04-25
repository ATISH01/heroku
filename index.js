const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { get } = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;
 
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://userdbAB:GFmbMOH4QPR2AIgp@cluster0.30ktu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const dataCollection = client.db('testDB').collection('testCollection');
        
        app.get('/data',async(req,res)=>{
            const query = {};
            const cursor = dataCollection.find(query);
            const data = await cursor.toArray(query);
            res.send(data)
        })
        app.post('/data',async(req,res)=>{
            const newData = req.body;
            const result = await dataCollection.insertOne(newData);
            res.send(result)
        })
        app.delete('/data/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await dataCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally{}
}
run().catch(console.dir)




app.get('/',(req,res)=>{
    res.send('Running server')
})

app.listen(port,()=>{
    console.log('LIstening',port);
})