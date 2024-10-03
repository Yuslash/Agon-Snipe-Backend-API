export default function Test(app)
{
    app.get('/test', (req, res) =>
    {
        res.send("IT will work Belive in my Confidence you will read this on the page")
    })
}