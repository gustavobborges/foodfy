const express = require('express')
const nunjucks = require('nunjucks')
// const routes = require("./routes")
const methodOverride = require('method-override')

const server = express()
const recipes = require("./data")

server.use(express.urlencoded({ extended:true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
// server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    return res.render("home")
})

server.get("/about", function(req, res) {
    return res.render("about")
})

server.get("/recipes", function(req, res) {
    return res.render("recipes")
})

server.get("/recipes/:id", function(req, res) {
    const id = req.query.id

    const recipe = recipes.find(function(recipe) {
        return recipe.title == id
    })

    if (!recipe) {
        return res.send("Receita não encontrada!")
    }

    return res.render("recipe", {item: recipe})
    // const recipeIndex = req.params.index
    // console.log(recipes[recipeIndex])
    // return res.render(recipes[recipeIndex])
    // return res.render("recipe")
})

server.get(function(req, res) {
    res.status(404).render("not-found")
})

server.listen(5000, function() {
    console.log("server is running...")
})
