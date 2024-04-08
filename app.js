//IMPORTANDO BIBLIOTECAS
const express = require("express");
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess,} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
var Agendamento = require(__dirname + '/models/Agendamento.js');
const handlebars = require("express-handlebars").engine;

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
    res.render("cadastro");
})

//CREATE
app.post("/cadastrar", async (req, res) => {
    Agendamento.create(req.body).then(function(agendamento)
    {
        console.log('Agendamento Cadastrado com Sucesso');
        res.redirect('/consulta');
    }).catch(function(error){
        console.log('Erro ao Cadastrar Agendamento');
        res.redirect('/');
    });
})



//READ
app.get("/consulta", async (req, res) => {
    Agendamento.findAll().then(function(agendamentos)
    {
        res.render("consulta", { agendamentos: agendamentos });
    }).catch(function(error){
        console.log('Erro ao Buscar Agendamentos');
        res.redirect('/');
    });
})



//EDITAR
app.get("/editar/:id", async (req, res) => {
    Agendamento.findByPk(req.params.id).then(function(agendamento)
    {
        res.render("editar", { agendamento: agendamento });
    }).catch(function(error){
        console.log('Erro ao Buscar Agendamento');
        res.redirect('/consulta');
    });
})

//UPDATE
app.post("/editar/:id", async (req, res) => {
    Agendamento.findByPk(req.params.id).then(async function(agendamento)
    {
        await agendamento.update(
            req.body,
            {
              where: {
                id: agendamento.id,
              },
            }
          ); 

        console.log('Agendamento Atualizado com Sucesso');
        res.redirect("/consulta");
    }).catch(function(error){
        console.log('Erro ao Atualizar Agendamento');
        res.redirect('/consulta');
    });
})



//DELETE
app.post("/deletar/:id", async (req, res) => {
    Agendamento.findByPk(req.params.id).then(function(agendamento)
    {
        agendamento.destroy();
        res.redirect('/consulta');
    }).catch(function(error){
        console.log('Erro ao Deletar Agendamento');
        res.redirect('/consulta');
    });
})



app.listen(8081, function(){
    console.log("Servidor Ativo na Porta 8081!");
})