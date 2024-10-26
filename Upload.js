export default function Upload(app, client) {

    app.post('/upload', async (req, res) => {

        try {
            const database = client.db('prisma')
            const mainCollection = database.collection("mainstream")

            const { title, description, username, game, viewedBy, videoUrl, imageFile } = req.body

            const userCollection = database.collection(`${username}`)

            const id = Date.now()

            const initialViews = 0
            let postCategory = "New Streamer"

            const jsonData = {
                id,
                title,
                description,
                username,
                imageFile,
                game,
                videoUrl,
                views: initialViews,
                category: postCategory,
                viewedBy: viewedBy ? viewedBy : []
            }

            await mainCollection.insertOne(jsonData)
            await userCollection.insertOne(jsonData)

            res.status(200).json({ message: "User Data Initialized", jsonData })
        } catch (error) {
            res.status(500).json({ message: "Error uploading data", error })
        }

    })


}