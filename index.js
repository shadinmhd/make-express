#!/usr/bin/env node

const { writeFile } = require("fs")
const {mkdirp} = require("mkdirp")

const userRoute = "const express = require(\"express\") \nconst router = express.Router() \n\n\nmodule.exports = router"

mkdirp("./routes").then(() => {
    writeFile("./routes/userRoute.js", userRoute, (err) => {
        if(err){
            console.log(err)
        }else{
            console.log("files created successfully")
        }
    })
})