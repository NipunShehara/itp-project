import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import "./CreateReport.css";


function UpdateReports() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ReportID, setReportID] = useState('');
    const [ReportCategory, setReportCategory] = useState('');
    const [UploadedDate, setUploadedDate] = useState('');
    const [Amount, setAmount] = useState('');
    const [Description, setDescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/getReport/' + id)
            .then(result => {
                const data = result.data;
                setReportID(data.ReportID);
                setReportCategory(data.ReportCategory);
                setUploadedDate(data.UploadedDate);
                setAmount(data.Amount);
                setDescription(data.Description);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/UpdateReport/" + id, {
            ReportID,
            ReportCategory,
            UploadedDate,
            Amount,
            Description
        })
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    text: 'Report has been successfully updated.',
                    confirmButtonText: 'OK',
                }).then(() => {
                    window.location.reload();
                });
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="Report">
            <div className="content2">
                <Link to="/" className='text-info'>Home</Link>
                <form onSubmit={Update} className="center-form">
                    <h2>Update Report</h2>
                    <div className='mb-3'>
                        <label htmlFor="reportId">Report ID</label>
                        <input
                            type="text"
                            name="reportId"
                            className="form-control"
                            value={ReportID}
                            onChange={(e) => setReportID(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="reportCategory">Report Category</label>
                        <select
                            name="reportCategory"
                            className="form-control"
                            value={ReportCategory}
                            onChange={(e) => setReportCategory(e.target.value)}
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
                            name="uploadedDate"
                            className="form-control"
                            value={UploadedDate}
                            onChange={(e) => setUploadedDate(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            className="form-control"
                            value={Amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateReports;
