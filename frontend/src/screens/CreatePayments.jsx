import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./CreatePayment.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";


function CreatePayments () {
    const [UserName, setUserName] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Amount, setAmount] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [contactRegexError, setContactRegexError] = useState('');
    const navigate = useNavigate();

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(selectedFile.name);
          setLoading(true);
          try {
            const snapshot = await fileRef.put(selectedFile);
            const url = await snapshot.ref.getDownloadURL();
            console.log(url);
            setImageUrl(url);
          } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file. Please try again.");
          } finally {
            setLoading(false);
          }
        } else {
          console.log("No file selected");
        }
      };



    const Submit = (e) => {
        e.preventDefault();

        // Validate contact number
        const contactRegex = /^\d{10}$/;
        if (!contactRegex.test(ContactNumber)) {
            setContactRegexError('Contact number must be ten numbers.');
            return;
        }

        if (!UserName || !paymentDate || !ContactNumber || !Email || !Amount || !zipFile) {
            alert('Please fill in all the fields.');
            return;
        }

        const formData = new FormData();
        formData.append('UserName', UserName);
        formData.append('paymentDate', paymentDate);
        formData.append('ContactNumber', ContactNumber);
        formData.append('Email', Email);
        formData.append('Amount', Amount);
        formData.append('zipFile', zipFile);

        axios.post("http://localhost:3001/payment/create-payments", formData)
        .then(result => {
            console.log(result);
            Swal.fire({
                title: "Paid",
                text: "Payment Success",
                icon: "success",
                confirmButtonText: "Okay"
            }).then(() => {
                navigate('/payments');
            });
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='container'>
            <div className="content1">
                <Link to="/payments" className='text-info1'>Home</Link>
                <form onSubmit={Submit} encType="multipart/form-data"> 
                 
                    <h2>Payment Gateway</h2>
                    <div className='mb-2'>
                        <label htmlFor="">User Name</label>
                        <input type="text" placeholder="Enter user name" className="form-control"
                        onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter the Email" className="form-control"
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Address</label>
                        <input type="text" placeholder="Enter the address" className="form-control"/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Contact Number</label>
                        <input type="text" placeholder="Enter the contact no" className="form-control"
                        onChange={(e) => {
                            setContactNumber(e.target.value);
                            setContactRegexError('');
                        }} />
                        {contactRegexError && <p className="text-danger1">{contactRegexError}</p>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Payment Date</label>
                        <input type="date" placeholder="Enter the payment Date " className="form-control"
                        onChange={(e) => setPaymentDate(e.target.value)} />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Account Details</label><br></br>
                        Account Number : 1050607050873<br></br>
                        Bank Name : BOC Bank , Malabe<br></br>
                        Please Attach Your Bank Slip For The Zip File !!<br></br>
                    </div>

                    <div>
                      <label htmlFor="image" className="block mb-1">
                        Image:
                      </label>
                      <input
                        type="file"
                        id="image"
                        required
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    {loading ? <p className="text-pretty">Uploading image...</p> : ""}
                    <div className='mb-2'>
                        <label htmlFor="">Amount</label>
                        <input type="number" placeholder="Enter the Amount " className="form-control"
                        onChange={(e) => setAmount(e.target.value)}/>
                    </div>
                    <button className="package"><center> Pay </center></button>
                    
                </form>
            </div>
        </div>
    )
}

export default CreatePayments;
