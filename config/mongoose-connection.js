const mongoose=require('mongoose');
const config=require('config');

const dbgr= require('debug')("development:mongoose")

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=>{
    // console.log("Connected to database");
    dbgr("Connected to database");
})
.catch((err)=>{
    console.log("error ::" + err); 
})

module.exports=mongoose.connection;