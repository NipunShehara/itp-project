const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    ReportID: String, 
    ReportCatogery: String, 
    UploadedDate: String,
    Amount: String,
    Description: String
   
})

const ReportModel = mongoose.model("reports", ReportSchema)
module.exports = ReportModel