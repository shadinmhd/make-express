#!/usr/bin/env node

const { exec } = require("child_process")
const { writeFileSync } = require("fs")
const { mkdirp } = require("mkdirp")

const appJsContent = `

const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const morgan = require("morgan")
const colors = require("colors")
require("dotenv").config()

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(session({
    secret : process.env.secret,
    resave : false,
    saveUninitialized : true
}))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(\`server started http://localhost:\${PORT}\`.cyan.bold)
})
`

const packageJsonContent =
    `
{
    "name": "dresser",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
        "start" : "nodemon" 
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "colors": "latest",
      "cookie-parser": "latest",
      "dotenv": "latest",
      "express": "latest",
      "express-session": "latest",
      "morgan": "latest",
      "nodemon" : "latest"
    }
}
  
`

const createDirectories = async () => {
    await mkdirp("./routes")
    await mkdirp("./public")
    await mkdirp("./middlewares")
    await mkdirp("./configs")
    await mkdirp("./models")
}

const createMainFile = () => {
    writeFileSync("./main.js", appJsContent)
}

try {
    exec("npm init -y")
    writeFileSync("./package.json", packageJsonContent)
    createDirectories()
    createMainFile()
    console.log(`
    install packages> npm install
    start server> npm start
    `)
} catch (err) {
}