const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()
//console.log(__dirname)
//console.log(__filename)


//define path for express configurations
const viewpath = path.join(__dirname,'../templates/views')
const publicdirpath = path.join(__dirname,'../public')
const partialpath = path.join(__dirname,'../templates/partials')



//set handlebars engine  and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)


// setup static directory to serve
app.use(express.static(publicdirpath))

app.get('',(req,res)=>{
 res.render('index1',{
     title:'weather',
     name:'sarja'
 }) 
})  

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'weather app',
        name: 'sarthak jain'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
      title:'help',
      name:'sarthak',
      message:'help given'
    })
})

app.get('/weather',(req,res)=>{                   //FOR MORE INFO SEE LECTURE 55
    if(!req.query.address){
       return res.send({
           error:"must provide an address"
        })    
    }
        
   geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{              // data but we used destructuring so dirrectlt passed
     if (error){

      return res.send({error})
     }
       //  console.log(location)
         forecast(latitude, longitude, (error, forecastdata) => {
         if(error){
              return res.send({error})
              }
         res.send({
             forecast: forecastdata,
             location:location,
             address:req.query.address
         })
      })
   })
})
app.get('/help/*',(req,res) =>{
    res.render('404')
})


app.get('/product',(req,res) =>{
   
    if(!req.query.search){                                    // query is an objetc carrying optional info
        res.send({
            error: 'you must provide a search term'
        })
    }
    else{
        res.send({
            success:"done babes"
        })
    }
  

})

app.get('*',(req,res) =>{
  res.render('404',{
        title:'ERROR 404',
        name:'content not there'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})