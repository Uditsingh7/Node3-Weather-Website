const request = require('request')

const foreCast = (lat, long, callback)=>{
    const forUrl = 'http://api.weatherstack.com/current?access_key=cf4bd3f663a68a171dfc79d4f4804f5b&query=' + lat +', ' + long 
    request({url:forUrl, json:true}, (error, { body })=>{
        if(error){
            callback('Unable to connect!', undefined)

        }
        else if (body.error){
            callback(body.error.info, undefined)
        }
        else{
            callback(undefined,
                 
                'It is '+ body.current.weather_descriptions[0] +
                ', and temperature is ' + body.current.temperature + '°C out there. '+
                'But it feels like ' + body.current.feelslike + '°C.' +
                "Observation Time: " + body.current.observation_time
                
            )
        }
    })
}

module.exports = foreCast