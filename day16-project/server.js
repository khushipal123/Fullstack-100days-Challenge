require("dotenv").config();
const app = require("./src/app");
const DbConnection = require("./src/config/database")

DbConnection();
app.listen(3000,()=>{
    console.log("Server is runnig.....")
})