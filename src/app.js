const path = require("path")
const express = require("express")
const hbs =  require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =  process.env.PORT || 3000 //First is provided by heroku and second is local

//Set path for configuring Express
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Initialise handlebars engine and views folder location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup the static directory to render
app.use(express.static(publicDirectoryPath))

app.get("/", (req,res) => {
    res.render("index", {
        title: "Key ForeCast",
        name: "Nirmalya Ray"
    }) 
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        helpText: "This page helps you resolve issues",
        name: "Nirmalya Ray"
    })
})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Nirmalya Ray"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    
    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({error})
        }

        //Getting temp at provided longitude and latitude
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: data.location,
            })
        })
    })

})


// Help error Page
app.get("/help/*", (req,res) => {
    res.render("404", {
        title: "Error Page",
        errorText: "Help text not found",
        name: "Nirmalya Ray"
    })
})

// 404 Page
app.get("*", (req,res) => {
    res.render("404", {
        title: "Error Page",
        errorText: "Page not found",
        name: "Nirmalya Ray"
    })
})


app.listen(port, () => {
    console.log("Server is up and running at port " + port);
})