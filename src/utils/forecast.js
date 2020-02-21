const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'https://api.darksky.net/forecast/e137c68f2062cf60e008558b34e0bf47/'+longitude+','+latitude+'?lang=hi&units=si'

   request({url:url,json:true},(error,{body}) => {
       if(error){
         callback('Unable to connect to servers',undefined)
       }
       else if(body.code){
        callback('wrong inout',undefined)
       }
       else{
        callback(undefined,{
            windSpeed : body.currently.windSpeed,
            summary : body.currently.summary,
            temperature: body.currently.temperature
        })
       }
    })
}

    module.exports = forecast 