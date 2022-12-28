const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

// Middle Wares
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.SOCIAL_BOOK_DB_USER}:${process.env.SOCIAL_BOOK_DB_PASSWORD}@cluster0.gijesb3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
      const postsCollection = client.db('social-book').collection('posts')
      const commentsCollection = client.db('social-book').collection('comments')
      
      app.post('/post', async(req, res) => {
         const post = req.body
         const result = await postsCollection.insertOne(post)
         res.send(result)
      })
      app.get('/posts', async(req, res) => {
         const query = {}
         const posts = await postsCollection.find(query).toArray()
         res.send(posts)
      })
      app.get('/post/:id', async(req, res) => {
         const id = req.params.id 
         const filter = {_id: ObjectId(id)}
         const result = await postsCollection.findOne(filter)
         res.send(result)
      })

      app.post('/comment', async(req, res) => {
        const comment = req.body
        const result = await commentsCollection.insertOne(comment)
        res.send(result)
      })
      app.get('/comments', async(req, res) => {
         const query = {}
         const comments = await commentsCollection.find(query).toArray()
         res.send(comments)
      })

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