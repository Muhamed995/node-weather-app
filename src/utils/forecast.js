const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/132f5bf79aa92ac0c6062576f5cbeeb0/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
  
    request({url:url,json:true}, (error,response)=>{
        const currently=response.body.currently;
      if(error){
          callback('Unable to connect to location services!',undefined);
      }else{
          callback(undefined,{
              summary:response.body.daily.summary,
              timezone:response.body.timezone,
              temperature:currently.temperature,
              precipProb:currently.precipProbability
              
          })
      }
    })
}

module.exports = forecast