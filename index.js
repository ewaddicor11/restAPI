const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 3000;
const connectionString = "mongodb+srv://bgreen3:ImBen@cluster0.fwvak.mongodb.net/Boston_AirBnB?retryWrites=true&w=majority"
mongoose.connect(connectionString,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    },
    (err, response)=>{
        if(err){
            console.log("There was error connecting to MongoDB!")
        }
        else{
            console.log("Connected to MongoDB!")
        }
    }
    )
    const mySchema = new mongoose.Schema({
        zipcode:Number
    })
    const model = mongoose.model("Boston_AirBnB",mySchema,"Boston_AirBnB")
app.get("/",(req,res)=>{
    // error handling
    const zipcode= req.query['zipcode']
    if(zipcode!==undefined){
        model.find({"zipcode": zipcode},(err,data)=>{
            if(err){
                console.log("Error getting data!")
            }
            else{
                res.json(data)
            }
        })
    }
    else {
        res.status(400).json({"error": "The keys is not correct, it should be zipcode"})
    }
})
app.listen(port, ()=>{
    console.log("Server is listening")
})