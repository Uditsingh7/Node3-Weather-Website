const path = require('path')

const express = require('express')

const hbs = require('hbs')

const geoCode = require('./utils/geoCode')

const foreCast = require('./utils/forecast')


const app = express()

// Define path for Express config

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve

app.use(express.static(publicDir))

// To get the info on our url

app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather Man',
        name: 'Uditsingh Thakur'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Us',
        name:'Uditsingh Thakur'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText:'This is some helpful text',
        name:'Uditsingh Thakur',
        title:'Help'
    })
})

// app.get('', (req, res )=>{
//          res.send('<h1>***Weather Man***</h1>')
// })

// app.com
// app.com/help
//app.com/about

// app.get('/help', (req, res)=>{
//     res.send([{
//         name:'Udit'
//     }, {
//         name:'nT'
//     }] )
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>What you want to know about me?</h1>')
// })

app.get('/weather', (req, res)=>{
    //res.send('<h1>Weather report</h1>')
    if(!req.query.address) {
        return res.send({
            error:'You must give an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        foreCast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })

    })
    // console.log(req.query.address)
    // res.send({
    //     forecast:"Its humid",
    //     location :"Mumbai",
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error:'You must a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})








app.get('/help/*', (req, res)=>{
    //res.send("Help article not found")
    res.render('404', {
        title:'404 Help',
        name:'Uditsingh Thakur',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res)=>{
    //res.send("My 404 Page")
    res.render('404', {
        title:'404',
        name: 'Uditsingh Thakur',
        errorMessage:'Page not found'
    })
})




app.listen(3000, ()=>{
    console.log("Server is up on port 3000.")
})
