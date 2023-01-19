const { Pool } = require('pg')

// PG URI
const PG_URI = 'postgres://bzjppifo:himEkmTnaU5MLztOpwO04lieDQUQ1AYK@queenie.db.elephantsql.com/bzjppifo'

// creating a new pool
const pool = new Pool({
  connectionString: PG_URI
})

// exporting query
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query' + text)
    return pool.query(text, params, callback)
  }
}
