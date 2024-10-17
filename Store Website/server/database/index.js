const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	password: 'akmik',
	host: 'localhost',
	port: 5432,
	database: 'e_commers'
});

pool.connect((err) => {
	if(err) console.log(err)
	console.log('done connection to the e_commerse database')
})

module.exports = pool