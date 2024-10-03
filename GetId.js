export default function GetId(app, collection, ObjectId)
{

    app.get('/info/:id', async (req, res) =>
    {
        try {

            const { id } = req.params

            const result = await collection.findOne({ _id: new ObjectId(id) })

            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ message : "Data not found" })
            }
            
        } catch (error) {
            console.error("Failed to Fetch", error)
        }
    })

}