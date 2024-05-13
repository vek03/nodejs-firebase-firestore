//IMPORTANDO BIBLIOTECAS
const express = require("express");
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess,} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
//var Agendamento = require(__dirname + '/models/Agendamento.js');
const handlebars = require("express-handlebars").engine;
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

var admin = require("./server/key/admin.json");

initializeApp({
    credential: cert(admin)
})

const db = getFirestore()


//Iniciando Bibliotecas
const app = express();

//Iniciando Middleware que recolhe os dados do formulário via POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Definindo rota dos arquivos complementares
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

//Definindo layout das páginas
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");



//ROTAS
//INDEX
app.get("/", (req, res) => {
    res.render("primeira_pagina");
})


//CREATE
app.post("/cadastrar", async (req, res) => {
    var result = db.collection('agendamentos').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        console.log('Added document');
        res.redirect('/')
    })
})



//READ
app.get("/consulta", async (req, res) => {
    
})



//EDITAR
app.get("/editar/:id", async (req, res) => {
    
})

//UPDATE
app.post("/editar/:id", async (req, res) => {
    
})



//DELETE
app.post("/deletar/:id", async (req, res) => {
    
})



app.listen(8081, function(){
    console.log("Servidor Ativo na Porta 8081!");
})