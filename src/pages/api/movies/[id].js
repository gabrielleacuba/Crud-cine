

export default async (req,res) => {
    const result = await fetch(`http://localhost:5000/movies/${req.query.id}`)
    const json = await result.json();

    res.status(200).json({
        info:json
    })
}