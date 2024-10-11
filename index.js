import express from 'express'
import Test from './Test.js'
import { MongoClient } from 'mongodb'
import Database from './Database.js'
import dotenv from 'dotenv'
import PostTest from './PostTest.js'
import GetId from './GetId.js'
import { ObjectId } from 'mongodb'
import Signup from './Signup.js'
import bcrypt from 'bcrypt'
import cors from 'cors'
import Login from './Login.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Upload from './Upload.js'
import ProfileData from './ProfileData.js'
import MainStreamData from './MainStreamData.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const uri = process.env.MONGO_URI
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
const client = new MongoClient(uri)

const database = client.db('agontest')
const collection = database.collection('testsnipe')

Test(app, client)
Database(client, app)
PostTest(client, app)
GetId(app, collection, ObjectId)
Signup(app, client, bcrypt)
Login(app, client, fs, path, fileURLToPath, bcrypt)
Upload(app, client)
ProfileData(app, client)
MainStreamData(app,client)

app.listen(3000, ()=>
{
    console.log("Server is Running on http://localhost:3000")
})