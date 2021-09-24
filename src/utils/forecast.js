const request = require("request")

const forecast = (lat, lon, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon) + "&appid=3dbbd41aa46f6239ba56b64ebc58e3ae&units=metric"
    
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to Weather service !', undefined)
        } else if(response.body.message) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, response.body.main.temp)
        }
    })
}

module.exports = forecast