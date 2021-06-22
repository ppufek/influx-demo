require('dotenv').config()
const _ = require('lodash')

const Influx = require('influx')

const client = new Influx.InfluxDB({
  database: process.env.DB,
  host: process.env.HOST,
  port: process.env.PORT
})

const {users} = require('./helper')
const randomUser = () => users[Math.floor(Math.random() * users.length)]
const rowCount = 10000
const startTimestamp = new Date().getTime()
const endTimestamp = new Date().getTime() + new  Date().getTime()

loadData = async () => {
  try {
    const rows = [...new Array(rowCount)].map((r) => {
      const username = randomUser()
      return {
        measurement: 'login_info',
        tags: {host: 'localhost', app: 'MyApp', Instance: 'Instance111', usernameTag: username },
        fields: { username },
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


