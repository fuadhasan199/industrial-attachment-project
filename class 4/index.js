require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require("./module/product");
const product = require('./module/product');
const app = express()
app.use(express.json()) 


const port = process.env.PORT  

mongoose.connect(process.env.DB_URI,{
       dbName:"crud"
}).then(()=>{
     console.log("Database Connected")
})

.catch(error => {
  console.error(error.message);
});
// Product Post
 app.post("/api/product",async(req,res)=>{
      try{
           const product =await Product.create(req.body) 
           res.status(201).json(product)
      } catch (error) {
           res.status(400).json({ message: error.message })
      }
 }) 

// Product Get
app.get("/api/product",async(req,res)=>{
      try{
           const product = await Product.find()
            res.json(product)
      } 
       catch (err) {
         res.status(500).json({ message: err.message })
       }
    }) 

    // Product Put 
    app.put("/api/product/:id",async(req,res)=>{
         try{ 
            const product =await Product.findOne({_id:req.params.id})
            if(!product){
                return res.status(404).json({ message: "Product not found" })
            } 
             product.name = req.body.name
             product.price = req.body.price
             product.description = req.body.description
             product.quantity = req.body.quantity

             await product.save();

             res.json(product);
            
         } 
         catch(error){
             res.status(500).json({ message: error.message })
         }
    }) 

    // product Delete 
    app.delete("/api/product/:id",async(req,res)=>{
            try{
                const product = await Product.deleteOne({_id:req.params.id}) 
                 if (!product) return res.status(404).json({ message: "Product not found"})

              res.json({message:"Product deleted Successfully",product}) 




            } 
            catch(error){
                 res.json({message:error.message})
            }
    })



app.listen(port, () => {
  console.log(`server running on : ${port}`)
})