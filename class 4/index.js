require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`server running on : ${port}`)
})