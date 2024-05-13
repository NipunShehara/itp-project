import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./payments.css";



function Payments() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/payment/get-payments')
        .then(result => {
            setPayments(result.data.allPaymentDetails);
            setError(null);
        })
        .catch(err => {
            setError("Failed to fetch payments. Please try again later.");
            console.error(err);
        });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/payment/delete-payments/${id}`)
        .then(() => {
            // Filter out the deleted payment from the payments array
            setPayments(prevPayments => prevPayments.filter(payment => payment.id !== id));
            window.location.reload();
        })
        .catch(err => {
            setError("Failed to delete payment. Please try again later.");
            console.error(err);
        });
    };

    return (
        <div className="container123">
            <div className="content123">
                <Link to="/create-payments" className='btn-success'>Add New Payment Gateway</Link>
                {error && <p className="error">{error}</p>}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Payment Date</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Action</th> {/* Added Action column */}
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment._id}</td>
                                <td>{payment.UserName}</td>
                                <td>{payment.paymentDate}</td>
                                <td>{payment.ContactNumber}</td>
                                <td>{payment.Email}</td>
                                <td>{payment.Amount}</td>
                                <td>
                                  <button className='btn-success' onClick={() => handleDelete(payment._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Payments;
