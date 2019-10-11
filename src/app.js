const path = require('path');
const express= require('express');
const hbs = require('hbs');
const app = express();
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const port=process.env.PORT || 3000;
 

   
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Muhamed Halilovic',
        fname:'Omer Halilovic'
    })
}) 
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us',
        info:'Save 20% of purchase right now hihi',
        fname:'Omer Halilovic'
    })
}) 
app.get('/help',(req,res)=>{
    res.render('help',{ 
        title:'Help page',
        help:'I think u should help us',
        fname:'Omer Halilovic'
    }) 
})   


app.get('/weather',(req,res)=>{
const address = req.query.address;

    if(!address){
        res.send({
            error:'You must provide address!'
        })
    }else{
        geocode(address, (error,data)=>{
    
            if(error){
                return console.log(error);
                
            }
            // console.log('Error', error);
            // console.log('Data',data);
            forecast(data.latitude,data.longitude,(error,forecastData)=>{
        
                if(error){
                    return console.log(error);
                    
                }
                
                res.send({
                    forecast:forecastData.summary,
                    minTemp:forecastData.temperatureLow,
                    location:data.location,
                    temperature:forecastData.temperature + 'C'
                })
                console.log(forecastData);

                
                
                
                
            })
        })
    }
   
})

app.get('/products',(req,res)=>{ 

    if(!req.query.search){
        res.send({
            error:'You must provide search term!'
        })
    }else{
        console.log(req.query);
        res.send({
            products:[]
        })

    }


})

app.get('/help/*', (req,res)=>{
    res.send('Help article not found.')

})

app.get('*', (req,res)=>{
    res.send('My 404 page')

})

app.listen(port,()=>{
    console.log('Server started on port '+ port);
})