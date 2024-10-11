export default function UpdateViews(app, client) {
    app.post('/updateViews/:id', async (req, res) => {
        const { username } = req.body
        const { id } = req.params

        const database = client.db('prisma')
        const mainstreamCollection = database.collection("mainstream")

        try {
            const viewedDoc = await mainstreamCollection.findOne({ id: parseInt(id) })

            if (viewedDoc) {
                await mainstreamCollection.updateOne(
                    { id: parseInt(id) },
                    { $addToSet: { viewedBy: username } }
                )

                const updatedDoc = await mainstreamCollection.findOne({ id: parseInt(id) })
                const viewsCount = updatedDoc.viewedBy.length

                await mainstreamCollection.updateOne(
                    { id: parseInt(id) },
                    { $set: { views: viewsCount } }
                )

                return res.status(200).json({
                    message: "Data updated successfully",
                    views: viewsCount
                })
            } else {
                return res.status(404).json({ message: "Document not found in mainstream collection" })
            }
        } catch (error) {
            console.error('Error updating collections:', error)
            return res.status(500).json({ message: "Internal server error" })
        }
    })

}