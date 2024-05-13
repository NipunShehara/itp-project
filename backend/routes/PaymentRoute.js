const express = require("express");
const router = express.Router();
const { createPayments, getAllPayments, getPaymentById, updatePaymentById, deletePaymentById, uploadZipFile } = require("../Controller/paymentController");

// Create new Payments
router.post('/create-payments',uploadZipFile, createPayments);

// Get all Payments
router.get('/get-payments', getAllPayments);

// Get Payments by id
router.get('/get-payments/:id', getPaymentById);

// Update Payments by id
router.put('/put-payments/:id', updatePaymentById);

// Delete Payments by id
router.delete('/delete-payments/:id', deletePaymentById);

module.exports = router;
