require("dotenv").config();
const connectDB = require("./db/connect.js");
const Product = require("./models/product.js");
const jsonProducts = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany(); // Deletando todos os produtos do banco de dados
        await Product.create(jsonProducts) // Criando os produtos contido em json Products
        console.log("Success!")
        process.exit(0) // Terminando o processo, 0 significa que tudo deu certo
    } catch (error) {
        console.log(error)
        process.exit(1) // Terminando o processo, 1 significa que algo deu errado
    }
}

start()