// const mongoose=require('mongoose');
// const config=require('config');

// const dbgr= require('debug')("development:mongoose")

// mongoose.connect(`${config.get("MONGODB_URI")}/scatch`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(()=>{
//     // console.log("Connected to database");
//     dbgr("Connected to database");
// })
// .catch((err)=>{
//     console.log("error ::" + err); 
// })

// module.exports=mongoose.connection;


const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

// Ensure the URI is correct and doesn't have unwanted characters
const uri = `${config.get("MONGODB_URI")}/scatch`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    dbgr("Connected to database");
})
.catch((err) => {
    console.error("Connection error: ", err); 
});

// Export the connection
module.exports = mongoose.connection;
