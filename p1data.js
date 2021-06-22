require('dotenv').config()
const _ = require('lodash')

const Influx = require('influx')

const client = new Influx.InfluxDB({
  database: 'monalisa_db',
  host: process.env.HOST,
  port: process.env.VIEWPORT
})

const {users} = require('./helper')
const randomUser = () => users[Math.floor(Math.random() * users.length)]
const rowCount = 1000
const startTimestamp = new Date().getTime()
const endTimestamp = new Date().getTime() + new  Date().getTime()

loadData = async () => {
  try {
    const rows = [...new Array(rowCount)].map((r) => {
      const username = randomUser()
      return {
        measurement: 'login_info',
        tags: {host: 'localhost', app: 'MyApp', Instance: 'Instance111'},
        fields: {username: randomUser()},
        timestamp: new Date(_.random(startTimestamp, endTimestamp))
      }
    })
    await client.writePoints(rows)
    console.log("Data stored successfully")
  } catch (err) {
    console.log("Error occurred while loading the data", err)
  }
}

loadData()


