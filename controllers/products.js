const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  // throw new Error('Error')
  const search = "ab";
  const products = await Product.find({price:{$gt: 20}}).sort('price').select("name price").limit(10);
  res.status(200).json({ products, nbhits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numbericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

if(numbericFilters){

    const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
    }

const regEX = /\b(<|>|>=|=|<=)\b/g
let filters = numbericFilters.replace(regEX, (match) => `-${operatorMap[match]}-`)
const options =['price','rating']
filters = filters.split(',').forEach((item) => {
    const [field, operator, value] = item.split('-')
    
    if(options.includes(field)){
        queryObject[field] = {[operator]: Number(value)}
    }
});

console.log(queryObject);

}

  // console.log(queryObject);
  let result = Product.find(queryObject);


  //sort
  if (sort) {
  
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList)
    // console.log(sort);
  } else {
    result = result.sort("created");
  }


  //fields
if(fields){
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList)
}

const page = Number(req.query.page) ||1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;

result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbhits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
