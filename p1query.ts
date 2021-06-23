import * as dotenv from 'dotenv'
dotenv.config()

const Influx = require('influx')

const client = new Influx.InfluxDB({
    database: process.env.DB,
    host: process.env.HOST,
    port: process.env.PORT
})

const runQuery = async () => {
    try {
        const results = await client.query(`
            select *
            from login_info limit 10
        `)
        console.table(results)
    } catch (err) {
        console.log("Error occurred while loading the data", err)
    }
}

runQuery()
