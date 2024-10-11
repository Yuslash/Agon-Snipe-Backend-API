export default function ProfileData(app, client) {
    app.get('/presonaldata', async (req, res) => {
        
        const { username } = req.query

        const database = client.db('prisma')
        const collection = database.collection(`${username}`)

        const data = await collection.find().toArray()

        res.status(200).json(data)
        
    })
}