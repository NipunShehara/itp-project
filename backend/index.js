const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ReportModel = require('./models/Report')

const PaymentRoute = require("./routes/PaymentRoute");

const app = express()
app.use(cors())
app.use(express.json())

try {
    mongoose.connect("mongodb+srv://root:1234@cluster0.do1rynm.mongodb.net/root?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to the MongoDB")
} catch (error) {
    console.log(error)
}

app.get('/', (req,res) => {
    ReportModel.find()
    .then(report => res.json(report))
    .catch(err => res.json(err))
})

app.get('/getReport/:id', (req,res) => {
    const id = req.params.id;
    ReportModel.findById({_id:id})
    .then(report => res.json(report))
    .catch(err => res.json(err))
})

app.put("/UpdateReport/:id", (req,res) => {
    const id = req.params.id;
    ReportModel.findByIdAndUpdate({_id:id}, {
        ReportID: req.body.ReportID,
        ReportCatogery:req.body.ReportCatogery, 
        UploadedDate: req.body.UploadedDate, 
        Amount: req.body.Amount, 
        Description: req.body.Description, 

    })
    .then(report => res.json(report))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id;
    ReportModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createReport", (req,res) => {
    ReportModel.create(req.body)
    .then(report => res.json(report))
    .catch(err => res.json(err))
})


app.use("/payment", PaymentRoute);

app.listen(3001, () => {
    console.log("Server is Running")
})