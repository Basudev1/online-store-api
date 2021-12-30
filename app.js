require("dotenv").config();
require('express-async-errors');
const express = require("express");
const app = express();
const prouductRouter = require("./routes/products");
const connectDB = require("./db/connect");
const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

//middleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send('<h1><a href="/api/v1/products">Products</a></h1>');
});

//product routes

app.use('/api/v1/products', prouductRouter)
//custom middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server started on port ${port}`));
  } 
  catch (error) {
    console.log(error);
  }
};
start()