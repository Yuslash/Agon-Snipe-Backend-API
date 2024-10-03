import express from 'express'
import Test from './Test.js'
import { MongoClient } from 'mongodb'
import Database from './Database.js'
import dotenv from 'dotenv'
import PostTest from './PostTest.js'

dotenv.config()

const uri = process.env.MONGO_URI
const app = express()
app.use(express.json())
const client = new MongoClient(uri)

Test(app)
Database(client, app)
PostTest(client, app)



app.listen(3000, ()=>
{
    console.log("Server is Running on http://localhost:3000")
})