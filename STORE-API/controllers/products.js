const Product = require("../models/product.js")

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({}).limit(10).skip(5)
    res.status(200).json({msg:"products testing route"})
}

const getAllProducts = async (req,res) => {
    const {featured,company,name,fields,numericFilters} = req.query
    const queryObject = {};

    if(featured){ // Caso exista uma variável featured executa a expressão
        queryObject.featured = featured === "true" ? true : false // Atribui o valor de featured a chave featured do novo objeto
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: "i"} // Presquisa avançada
    }
    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte",
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field,operator,value] = item.split("-")
            if(options.includes(field)){
                queryObject[field]= {[operator]:Number(value)}
            }
        })
    }
    let result = Product.find(queryObject);

    if(fields){
        const fieldsList = fields.split(",").join(' ');
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products})
}

 
module.exports = {
    getAllProducts,
    getAllProductsStatic,
}