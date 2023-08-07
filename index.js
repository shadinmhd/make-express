#!/usr/bin/env node

const { exec } = require("child_process")
const {writeFileSync} = require("fs")
const { mkdirp } = require("mkdirp")

const createDirectories =async () => {
    await mkdirp("./routes")
    await mkdirp("./public")
    await mkdirp("./middlewares")
    await mkdirp("./configs")
    await mkdirp("./models")
}

const createMainFile = () => {
    writeFileSync("./main.js","",(err) => {
        if(err){
            console.log(err)
        }
    })        
}

try{
    exec("npm init -y", (err) => console.log(err))
    createDirectories()
    createMainFile()
    console.log(`
        npm install
    `)
}catch(err){
    console.log(err)
}