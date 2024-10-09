import multer from "multer"

export default function Upload(app, client) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/')
        },
        filename: function (req, file, cb) {
            cb(null, `${file.originalname}`)
        }
    })

    const upload = multer({ storage: storage })

    app.post('/upload', upload.single("imageFile"), async (req, res) => {

        try {
            const database = client.db('prisma')
            const mainCollection = database.collection("mainstream")

            const { title, description, username, viewedBy, category } = req.body

            const userCollection = database.collection(`${username}`)

            const imageFile = req.file ? req.file.filename : null

            const id = Date.now()

            const initialViews = 0
            let postCategory = "New Streamer"

            const jsonData = {
                id,
                title,
                description,
                imageFile,
                username,
                views: initialViews,
                category: postCategory,
                viewedBy: viewedBy ? viewedBy : []
            }

            await mainCollection.insertOne(jsonData)
            await userCollection.insertOne(jsonData)

            res.status(200).json({ message: "User Data Initialized", jsonData })
        } catch (error) {
            res.status(500).json({ message: "Error uploading data", error });
        }

    })


}