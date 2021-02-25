const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
let path= require("path");
const app = express(); 
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
const db = mongoose.createConnection("mongodb://localhost:27017/interview", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const serviceSchema= new mongoose.Schema({
  url : String,
  title: String,
}) 
const ServiceModel = db.model("services", serviceSchema);

app.post("/add", async(req,res)=>{
  const service = req.body;
  service.url = req.body.url;
  service.title = req.body.title;
  const newService = new ServiceModel(service);
  await newService.save();
  res.status(201).send(newService);
}).catch=(err)=>{
  console.log(err);
}

app.listen(9999);
