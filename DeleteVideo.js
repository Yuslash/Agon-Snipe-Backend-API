export default function DeleteVideo(app, client) {
    app.delete('/view/:id', async (req, res) => {
        
        const { id } = req.params
        const { username } = req.body

        const database = client.db('prisma')
        const userCollection = database.collection(`${username}`)
        const mainCollection = database.collection('mainstream')

        const parsedId = parseInt(id, 10)

        const resultUser = await userCollection.deleteOne({ id: parsedId })

        if(resultUser.deletedCount === 1) {
            await mainCollection.deleteOne({ id: parsedId })
            res.status(200).json({ message: "Document Deleted Successfully from both Collections" })
        } else {
            res.status(404).json({ message: "Document Not Found" })
        }

    })
}