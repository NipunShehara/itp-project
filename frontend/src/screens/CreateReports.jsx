import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./CreateReport.css";


function CreateReports() {
    const [reportID, setReportID] = useState('');
    const [reportCatogery, setReportCatogery] = useState('');
    const [uploadedDate, setUploadedDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!reportID || !reportCatogery || !uploadedDate || !amount || !description) {
            alert('Please fill in all the fields.');
            return;
        }

        axios.post("http://localhost:3001/createReport", {
            ReportID: reportID,
            ReportCatogery: reportCatogery, // corrected from 'reportCatogery' to 'reportCategory'
            UploadedDate: uploadedDate,
            Amount: amount,
            Description: description
        })
        .then(result => {
            console.log(result);
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='Report'>
            <div className="content2">
                <Link to="/" className='text-info'>Home</Link>
                <form onSubmit={handleSubmit}>  
                    <h2>Add New Report</h2>
                    <div className='mb-3'>
                        <label htmlFor="reportId">Report Id</label>
                        <input
                            type="text"
                            id="reportId"
                            name="reportId"
                            placeholder="Enter report id"
                            className="form-control"
                            onChange={(e) => setReportID(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="reportCategory">Report Category</label>
                        <select
                            id="reportCategory"
                            name="reportCategory"
                            className="form-control"
                            onChange={(e) => setReportCatogery(e.target.value)}
                            required
                        >
                            <option value="">Select Report Category</option>
                            <option value="income report">Income Report</option>
                            <option value="expenses report">Expenses Report</option>
                            <option value="netincome report">Net Income Report</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="uploadedDate">Uploaded Date</label>
                        <input
                            type="date"
                            id="uploadedDate"
                            name="uploadedDate"
                            placeholder="Enter the uploaded date"
                            className="form-control"
                            onChange={(e) => setUploadedDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Enter Amount"
                            className="form-control"
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="package1">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateReports;
