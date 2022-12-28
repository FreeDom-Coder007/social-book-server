const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000


const uri = `mongodb+srv://${process.env.SOCIAL_BOOK_DB_USER}:${process.env.SOCIAL_BOOK_DB_PASSWORD}@cluster0.gijesb3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

    }
    finally{}
}

run()
.catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send('Social book server running')
})
app.listen(port, () => {
    console.log('Social Book Server running on:', port)
})