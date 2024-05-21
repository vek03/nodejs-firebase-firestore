# ETAPAS
O projeto ainda está finalizado:

- [x] Estrutura
- [x] Front-End
- [x] CREATE
- [x] READ
- [ ] UPDATE
- [x] DELETE

> Projeto CRUD com Firebase FireStore em Node.js e Handlebars

# INICIANDO PROJETO</h1>
### Adicione seu arquivo .json com a chave da API Firebase no pasta server/key e a renomeie para 'admin.json'
```
git clone <link_repositorio>
cd <projeto>
npm i
npm run start
```
- htttp://localhost:8081

<br><br>

# EXPLICAÇÕES
- Server: arquivo de conexão ao banco
- public: arquivos JS, CSS e Imagens da aplicação
- app.js: inicialização das bibliotecas, rotas e operações
- views/layout: arquivos de layout que serão utilizados em todas as páginas
- views: paginas do projeto 

<br><br>

# GITHUB
> SUBINDO SUAS ALTERAÇÕES PARA O GITHUB
## PRIMEIRA VEZ (quando ainda não existir a sua branch):
```
git checkout -b <seu_nome>
git add *
git commit -m "<seu_comentario>"
git push -u origin <seu_nome>
```
- pull request pelo site do Github da sua branch para a branch de homologação

<br>

## OUTRAS VEZES
```
git checkout -b <seu_nome>
git add *
git commit -m "<seu_comentario>"
git push origin <seu_nome>
```
- pull request pelo site do Github da sua branch para a branch de homologação

<br><br>

# PUXANDO AS ALTERAÇÕES DA BRANCH DE HOMOLOGAÇÃO
Caso o projeto já exista na sua máquina e outra pessoa tiver feito alterações antes de você, execute:
```
git pull <link_repositorio> homologacao
```

<br><br>

# SUBINDO PARA UMA BRANCH EXISTENTE
Caso você esteja editando em um PC novo e queira atualizar sua branch que JA EXISTE:
```
//Comece trazendo os dados da branch
git clone -b <sua_branch> <link_repositorio>

//Após editar tudo
git add *
git commit -m "<comentario>"
git push origin <sua_branch>
```

<br><br><br>

# DOCUMENTAÇÃO
```
npm i express --save
npm i express-handlebars --save
npm i sequelize --save
npm i mysql2 --save
npm i nodemon --save-dev
npm i body-parser --save
npm i bootstrap --save
npm i jquery --save
```

- Handlebars: https://handlebarsjs.com/guide/
- Bootstrap: https://getbootstrap.com
- Firebase: https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br 