export default function Login(app, client, fs, path, fileURLToPath, bcrypt) {
    app.post('/login', async (req, res) => {
        
        const { username, password } = req.body 

        const database = client.db('prisma')
        const collection = database.collection('user')

        const user = await collection.findOne({ username })

        if(user) {
            const isMatch = await bcrypt.compare(password, user.password )

            if(isMatch) {
                res.status(200).json({ message: 'Login Successfull', })
            } else {
                res.status(400).json({ message: "Invalid Password" })
            }
        } else {
            res.status(404).json({message : "User not Found"})
        }
    })
}