const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("../models/db.js");
const User = require("../models/User.js");
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('Hello World!');
});

app.post('/cadastrar', async (req, res)=>{

    const userFind = await User.findOne({
        attributes: ['email'],
        where: {
            email: req.body.email
        }
    })

    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    
    if (userFind === null){
        await User.create(dados)
        .then(() =>{
            return res.send("Usuário cadastrado com sucesso")
        }).catch(()=>{
            return res.send("Usuário não foi cadastrado com sucesso")
        });
    }
    else{
        return res.send("Usuário já cadastrado")
    }

});

app.post('/login', async(req, res) =>{

    const userFind = await User.findOne({
        attributes: ['email', 'password'],
        where: {
            email: req.body.email
        }
    })

    if(userFind == null){
        return res.json({
            erro:false,
            mensagem: "Email ou senha inválidos"
        })
    } 
    else if(!(await bcrypt.compare(req.body.password, userFind.password))){
        return res.json({
            erro:false,
            mensagem: "Email ou senha inválidos"
        })
    }else{
        return res.json({
            erro:false,
            mensagem: "Login realizado com sucesso"
        })
    }
});

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000: http://localhost:3000")
})