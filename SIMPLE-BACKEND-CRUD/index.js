const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose")
const productRoute = require("./routes/product.route.js");
// Importando o modelo de produtos do módulo product.model.js
const Product = require("./models/product.model.js");
const app = express();

// Comando que permite que sejam enviados json para o servidor
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})

//routes --> rota padrão
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    res.send("Hello from Node API")
});

/* Neste trecho estamos realizando a conexão da aplicação com o banco de dados criado no MongoDB.
Consiste basicamente em importar o módulo mongoose e utilizar o método connect. Passamos como argumento
da função o link de conexão, que pode ser encontrado na aba connect no site do MongoDB, em seguida
devemos trocar a senha em admin:<password> para a senha definida para o banco de dados. Podemos
também modificar a url após a / em mongodb.net/---- */ 

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to database");
})
.catch((error) => {
    console.error("MOngoDB connection error: ", error)
});
