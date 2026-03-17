const { default: mongoose } = require("mongoose");
const Mogoose = require("mongoose");

function DbConnection(){
    mongoose.connect(process.env.URI_DB)
    .then(()=>{
        console.log("Database Connected....")
    })
}


module.exports = DbConnection;