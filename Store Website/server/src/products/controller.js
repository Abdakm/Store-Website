const db = require('../../database')
const queries = require('./queries')

const getCategories = (req, res) => {
	db.query(queries.getCategories, (err, result) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 status for server errors
    if (result.rows.length) return res.status(200).json(result.rows); // Respond with data if found
    return res.status(404).json({ message: 'No categories found' }); // Send 404 if no data
  });
}

const getSubCategory = (req, res) => {
    const id = +req.params.id;
    db.query(queries.getSubCategory, [id], (err, result) => {
        if(err) return res.status(500).json({ error: "Internal Server Error"})
        if(result.rows.length) return res.status(200).json(result.rows);
        return res.status(404).json({message: 'No getSubCategory avalible'})
    })
}

const getProducts = (req, res) => {
    const id = +req.params.id;
    db.query(queries.getProducts, [id], (err, result) => {
        if(err) return res.status(500).json({ error: "Internal Server Error "});
        if(result.rows.length) return res.status(200).json(result.rows);
        return res.status(200).json({message: 'No Products Here !!!'})
    })
}

const getAllProducts = (req, res) => {
    db.query(queries.getAllProducts, (err, result) => {
        if(err) return res.status(500).json({ error: "Internal Server Error "});
        if(result.rows.length) return res.status(200).json(result.rows);
        return res.status(200).json({ message: 'No Products Here !!!'})
    })
}
module.exports = {
	getCategories,
    getSubCategory,
    getProducts,
    getAllProducts,
}