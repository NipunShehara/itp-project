const PaymentModel = require("../models/Payment");
const multer = require('multer'); 

// exports.createPayments = async (req, res) => {
//     try {
//         const paymentReq = req.body;
//         const PaymentData = await PaymentModel.create(paymentReq);
        
//         if (!PaymentData) {
//             return res.status(401).json({ message: "Failed to create payment" });
//         }
        
//         return res.status(201).json({ message: "Payment created successfully", createdPaymentData: PaymentData });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server error while creating payment" });
//     }
// };

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.createPayments = async (req, res, next) => {
    try {
        const paymentReq = req.body;
        
        const PaymentData = await PaymentModel.create({
            ...paymentReq,
        });

        if (!PaymentData) {
            return res.status(401).json({ message: "Failed to create payment" });
        }
        
        return res.status(201).json({ message: "Payment created successfully", createdPaymentData: PaymentData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while creating payment" });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const PaymentData = await PaymentModel.find();
        
        if (!PaymentData || PaymentData.length === 0) {
            return res.status(404).json({ message: "No payments found" });
        }
        
        return res.status(200).json({ message: "Payments retrieved successfully", allPaymentDetails: PaymentData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while getting payments" });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await PaymentModel.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        return res.status(200).json({ message: "Payment found", paymentDetails: payment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while getting payment by ID" });
    }
};

exports.updatePaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const updates = req.body;

        // Find and update the payment
        const updatedPayment = await PaymentModel.findByIdAndUpdate(
            paymentId,
            updates,
            { new: true } // To return the updated document
        );

        // If no payment is found with the given ID, return 404
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Return the updated payment
        return res.status(200).json({
            message: "Payment with ID: " + paymentId + " has been updated",
            updatedPayment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.deletePaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await PaymentModel.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        await PaymentModel.findByIdAndDelete(paymentId);
        res.status(200).json({ message: "Payment with ID: " + paymentId + " has been deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.uploadZipFile = upload.single('zipFile');

