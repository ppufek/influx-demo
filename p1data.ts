import * as dotenv from 'dotenv'
dotenv.config()

import {_} from 'lodash'
import {v4} from 'uuid'

import * as Influx from 'influx'

const client = new Influx.InfluxDB({
    database: process.env.DB as string,
    host: process.env.HOST as string,
    port: process.env.PORT as any,
})

//metadata
const rowCount = 100
const startTS = 1621768486000 //Sun, 23 May 2021 11:14:46 GMT
const endTS = 1624446886000 //Wed, 23 Jun 2021 11:14:46 GMT

const loadData = async () => {
    try {
        const vin = v4()
        const rows = [...new Array(rowCount)].map((r) => {
            return {
                measurement: 'stats',
                tags: {vin},
                fields: {
                    speed: Math.floor(Math.random() * (250 - 0 + 1)) + 0, // individual values of a measurement
                    acceleration: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
                    longitude: (Math.random() * (180 - (-180)) + (-180)).toFixed(3) as any * 1,
                    latitude: (Math.random() * (180 - (-180)) + (-180)).toFixed(3) as any * 1
                },
                timestamp: new Date(_.random(startTS, endTS))
            }
        })
        await client.writePoints(rows)
        console.log("Data stored successfully")
    } catch (err) {
        console.log("Error occurred while loading the data", err)
    }
}

loadData()