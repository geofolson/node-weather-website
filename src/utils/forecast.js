const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const access_key = '728026ebecf3b2db3cabbffdb15ba968'
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const weather = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const precipitation = body.current.precip

            callback(undefined, ` ${weather}. It is currently ${temperature} degrees out. There is a ${precipitation}% chance of rain.`)
        }
    })
}

module.exports = forecast