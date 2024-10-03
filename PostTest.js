export default function PostTest(client, app)
{
    app.post('/add', async (req, res) => 
    {
        const { username, password } = req.body

        const database = client.db('agontest')
        const collectoin = database.collection('testsnipe')

        await collectoin.insertOne({ username , password })

        res.status(200).json({username, password})
    })
}

