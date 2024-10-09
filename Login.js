export default function Login(app, client, fs, path, fileURLToPath, bcrypt) {
    app.post('/login', async (req, res) => {
        
        const { username, password } = req.body 

        const database = client.database('prisma')
        const collection = database.collection('user')

        const user = await collection.findOne({ username })

        if(user) {
            const isMatch = await bcrypt.compare({ password: user.password })

            if(isMatch) {
                res.status(200).json({ message: 'Login Successfull', })
            }
        }
    })
}