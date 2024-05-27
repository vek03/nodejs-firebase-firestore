//IMPORTANDO BIBLIOTECAS
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess,} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
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

//Iniciando Sessions
app.use(session({
    secret: 'key',
    resave: true,
    saveUninitialized: true
}));

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
    try{
        return res.render("primeira_pagina");
    }catch(error){
        console.log('Error getting documents:', error);
        return res.render("error/erro", {error: "500", textError: 'Erro no Servidor!'});
    }
})


//CREATE
app.post("/cadastrar", async (req, res) => {
    try{
        await db.collection('agendamentos').add({
            nome: req.body.nome,
            telefone: req.body.telefone,
            origem: req.body.origem,
            data_contato: req.body.data_contato,
            observacao: req.body.observacao
        })
        .then(function(){
            console.log('Added document');
            req.session.success = 'Cliente Cadastrado!';
            res.redirect('/consulta')
        })
        .catch(function(error){
            console.log('Error adding document:', error);
            req.session.error = 'Ocorreu um Erro ao Cadastrar o Cliente!';
            res.redirect('/')
        })
    }catch(error){
        console.log('Error getting documents:', error);
        return res.render("error/erro", {error: "500", textError: 'Erro no Servidor!'});
    }
})



//READ
app.get("/consulta", async (req, res) => {
    try{
        var agendamentos = []
        var snapshot = await db.collection('agendamentos').get()
        snapshot.forEach(doc => {
            var key = doc.id;
            var data = doc.data();
            data.key = key;
            agendamentos.push(data);
        })
        
        res.render("consulta", {agendamentos: agendamentos})
    }catch(error){
        console.log('Error getting documents:', error);
        req.session.error = 'Ocorreu um Erro ao Listar os Clientes!';
        res.redirect('/')
    }
})



//EDITAR
app.get("/editar/:id", async (req, res) => {
    try{
        var id = req.params.id
        var agendamento = await db.collection('agendamentos').doc(id).get()

        if(!agendamento.exists){
            req.session.error = 'Cliente não Encontrado!';
            return res.redirect('/consulta')
        }
        
        return res.render("editar", {agendamento: agendamento.data(), id: id})
    }catch(error){
        console.log('Error getting documents:', error);
        req.session.error = 'Ocorreu um Erro ao Visualizar o Cliente!';
        return res.redirect('/consulta')
    }
})

//UPDATE
app.post("/editar/:id", async (req, res) => {
    try{
        var id = req.params.id
        await db.collection('agendamentos').doc(id).update({
            nome: req.body.nome,
            telefone: req.body.telefone,
            origem: req.body.origem,
            data_contato: req.body.data_contato,
            observacao: req.body.observacao
        })
        .then(function(){
            console.log('Document Updated');
            req.session.success = 'Cliente Editado com Sucesso!';
            return res.redirect('/consulta')
        })
        .catch(function(error){
            console.log('Error updating document:', error);
            req.session.error = 'Ocorreu um Erro ao Editar o Cliente!';
            return res.redirect('/consulta')
        })
    }catch(error){
        console.log('Error getting documents:', error);
        return res.render("error/erro", {error: "500", textError: 'Erro no Servidor!'});
    }
})



//DELETE
app.post("/deletar/:id", async (req, res) => {
    try{
        var id = req.params.id
        await db.collection('agendamentos').doc(id).delete()
        .then(function(){
            console.log('Document Deleted');
            req.session.success = 'Cliente Deletado com Sucesso!';
            return res.redirect('/consulta')
        })
        .catch(function(error){
            console.log('Error deleting document:', error);
            req.session.error = 'Ocorreu um Erro ao Deletar o Cliente!';
            return res.redirect('/consulta')
        })
    }catch(error){
        console.log('Error getting documents:', error);
        return res.render("error/erro", {error: "500", textError: 'Erro no Servidor!'});
    }
})



//Verificar Erro
app.get('/getError', (req, res) => {
    const error = req.session.error;
    delete req.session.error; // Limpar a sessão após usar

    if (error) {
        res.json({ error });
    } else {
        res.json({});
    }
});



//Verificar Sucesso
app.get('/getSuccess', (req, res) => {
    const success = req.session.success;
    delete req.session.success; // Limpar a sessão após usar

    if (success) {
        res.json({ success });
    } else {
        res.json({});
    }
});



//FALLBACK
app.use((req, res) => {
    return res.render("error/erro", {error: "404", textError: 'Página Inexistente!'});
})




app.listen(8081, function(){
    console.log("Servidor Ativo na Porta 8081!");
})