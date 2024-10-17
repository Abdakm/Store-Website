const getCategories = 'SELECT * FROM categories';
const getSubCategory = `SELECT * FROM SubCategories WHERE category_id=$1`;
const getProducts = `SELECT products.*, subcategories.subcategory_name FROM Products join subcategories on subcategories.subcategory_id=products.subcategory_id and products.subcategory_id = $1;`
const getAllProducts = `select products.*,subcategories.subcategory_name from products join subcategories on products.subcategory_id = subcategories.subcategory_id;`

module.exports = {
	getCategories,
	getSubCategory,
	getProducts,
	getAllProducts,
}