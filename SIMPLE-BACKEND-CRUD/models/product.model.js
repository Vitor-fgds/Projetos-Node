/* Criando o model que servirá como a base para criarmos dados para o nosso banco de dados, é como
se estivessemos criando uma tabela no sql. Aqui nós criamos um modelo que recebe um objeto, este, por
sua vez, recebe as chaves que serão contidas no objeto. Cada uma dessas chaves recebe um objeto com
suas configurações, como o tipo de dados, valor padrão e se ela é obrigatória ou não. Por exemplo,
estamos criando o modelo de produto, ou seja, vai ser a nossa base para cria e adicionar produtos
no banco de dados. Cada produto terá um nome, quantidade, valor e uma imagem. */

const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },

    quantity: {
        type: Number,
        required: true,
        default: 0,
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    image: {
        type: String,
        required: false,
    }

}, {
    timestamps: true,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product