const Sequelize = require("sequelize");

const db = new Sequelize("login", "root", "BingChilling310304#", {
    host: "localhost",
    dialect: "mysql"
});

db.authenticate()
.then(function(){
    console.log("Ação realizada com sucesso")
}).catch(function(){
    console.log("Erro: Ação não realizada com sucesso")
});

module.exports = db;