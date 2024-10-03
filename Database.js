export default function Database(client, app)
{

    app.get('/data', async (req, res) =>
    {
        const database = client.db('prisma')
        const collection = database.collection('mainstream')

        const data = await collection.find({}).toArray()

        res.status(200).json({ data })
    })

}