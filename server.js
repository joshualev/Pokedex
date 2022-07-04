// =====================DEPENDENCIES=========================
const express = require('express')
const app = express()
const PORT = 3000
const methodOverride = require('method-override')
// ==========================================================
// =======================MIDDLEWARE=========================
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use(express.static("public"));
// ==========================================================
// ====================MODEL EXTRACTION======================
const pokemon = require('./models/pokemon.js')
// ==========================================================
////ROUTES////////////////////////////////////////////////////
///======================================================== >
// ==========================INDEX===========================
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemon: pokemon,
        tabTitle: "Pokedex",
        cssFile: "index"
    })
})
// ==========================================================
// ==========================NEW=============================
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs', {
        pokemon: pokemon,
        tabTitle: "Create New Pokemon",
        cssFile: "new"
    })
})
// ==========================================================
// ===================ADD POKEMON POST REQ===================
app.post('/pokemon', (req, res) => {
    console.log('POST request received')
    pokemon.push(req.body)
    const index = pokemon.indexOf(req.body)
    res.redirect('/pokemon/' + index)
    console.log(pokemon)
})
// ==========================================================
// ==========================SHOW============================
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id],
        id: req.params.id,
        tabTitle: "Pokemon Information",
        cssFile: "show"
    })
})
// ==========================================================
// =================REMOVE POKEMON DELETE REQ================
app.delete('/pokemon/:id', (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
})
// ==========================================================
// ===================EDIT POKEMON PUT REQ===================
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body
    res.redirect('/pokemon')
})

//EDIT//
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        pokemon: pokemon[req.params.id],
        pokemon2: pokemon,
        id: req.params.id,
        tabTitle: "Edit Pokemon",
        cssFile: "edit"
    })
})
// ==========================================================
////LISTENER//////////////////////////////////////////////////
///======================================================== >         
app.listen(PORT, () => {
    console.log("listening on port: ", PORT)
})
// =======================================

