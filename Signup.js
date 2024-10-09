export default function Signup(app, client, bcrypt) {

    app.post('/login', async (req, res) => {
        
        const { username, password } = req.body

        const database = client.db('prisma')
        const collection = database.collection('user')

        const existingUser = await collection.findOne({ username })

        if(existingUser) {
            return res.status(400).json({ message : "User is Already Exist" })
        }

        const passwordHash = await bcrypt.hash( password, 10 )
        const newUser = { username, password: passwordHash }

        await collection.insertOne(newUser)

        res.status(201).json({ username })

    })

}