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
            const feelsLike = body.current.feelslike
            const precipitation = body.current.precip
            const humidity = body.current.humidity

            callback(undefined, ` ${weather}. It is currently ${temperature} degrees out. It feels like it is ${feelsLike} degrees out. There is a ${precipitation}% chance of rain. The current humidity level is ${humidity}%`)
        }
    })
}

module.exports = forecast