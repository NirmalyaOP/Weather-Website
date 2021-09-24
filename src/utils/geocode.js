const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmlybWFseWFyYXkiLCJhIjoiY2tzM2dxZG5pMXZ4czJ2bXJjYWVpN29heiJ9.blEyjWnA5r9Ln7JeANJ3cQ&limit=1"

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to location services!", undefined);
        }else if(response.body.features.length===0){
            callback("Unable to find the location. Try something else!",undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode