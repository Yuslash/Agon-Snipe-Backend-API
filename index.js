import express from 'express'
import Test from './Test.js'
import { MongoClient } from 'mongodb'
import Database from './Database.js'
import dotenv from 'dotenv'
import PostTest from './PostTest.js'
import GetId from './GetId.js'
import { ObjectId } from 'mongodb'

dotenv.config()

const uri = process.env.MONGO_URI
const app = express()
app.use(express.json())
const client = new MongoClient(uri)

const database = client.db('agontest')
const collection = database.collection('testsnipe')

Test(app)
Database(client, app)
PostTest(client, app)
GetId(app, collection, ObjectId)


app.listen(3000, ()=>
{
    console.log("Server is Running on http://localhost:3000")
})