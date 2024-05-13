const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    UserName: String, 
    paymentDate: String,
    ContactNumber: String,
    Email: String,
    Amount: String,
    imageUrl: {
        type: String,
        required: true,
      },
      // Store content type (e.g., 'application/zip')
    
});

const PaymentModel = mongoose.model("payments", paymentSchema);
module.exports = PaymentModel;
