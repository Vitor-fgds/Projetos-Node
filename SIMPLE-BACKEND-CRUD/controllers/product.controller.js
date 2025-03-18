const Product = require("../models/product.model")

const getProducts = async(req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const postProduct = async (req, res) => {

    /*Criamos uma função assíncrona que irá servir para adicionar os produtos em nosso database.
    Primeiro, decidimos a url que será utilizada para postar novos produtos, no caso /api/products.
    Após isso, utilizamos o método create com o módulo do modelo importado anteriormente para criar
    o novo elemento em nosso banco de dados. Este elemento será criado com os dados que passamos no
    body de nossa request. Passamos como dados no body um json, ou seja, um objeto. Este objeto deve
    possuir as chaves que definimos no modelo e seu conteúdo deve seguir as regras também definidas.
    Além de adicionar o produto no banco de dados também retornamos um status de sucesso e o objeto adicionado.
    Tudo isso é envolvido por um try/catch. Caso não seja possível adicionar o novo produto enviado no body,
    por diversos motivos, será retornado um outro json/objeto que retorna uma mensagem de erro.
    */

    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // Atualizamos o produto (objeto) pela nova estrutura que enviamos no body
    // Podemos modificar apenas algumas chaves, não há necessidade de reescrever o objeto inteiro

        if (!product){
            return res.status(404).json({message: "Product not found!"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found!"})
        }
        res.status(200).json({message: "Product deleted successfully"})

    } catch (error) {
        res.status(404).json({message: error.message})
    }
};


module.exports = {
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
}