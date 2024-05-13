import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Report.css";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';


function Reports () {
    const [reports, setReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => setReports(result.data))
        .catch(err => console.log(err))
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
        .then(res => {
            console.log(res);
            Swal.fire({
                icon: 'success',
                text: 'Report details have been successfully deleted.',
                confirmButtonText: 'OK',
            }).then(() => {
            window.location.reload();
                });
            })
        .catch(errr => console.log(errr));
    }
    const generateExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(reports);
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        XLSX.writeFile(wb, "Report.xlsx");
    };

    const filteredReports = reports.filter(report => {
        return (
            report.ReportID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.ReportCatogery.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.UploadedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.Amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.Description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    return (
        <div className="container12345">
            <div className="content12345">
                <Link to="/create" className='btn-success'>Add New Report +</Link><br></br><br></br> 
                <button className="btn-success" onClick={generateExcel}>Generate Excel Report</button>
                <div id="pdf-content">
                    <input
                        type="text"
                        placeholder="Search ..........."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control mb-3"
                    />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Report Catogery</th>
                            <th>Uploaded Date</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredReports.map((report) => (
                                <tr key={report._id}>

                                            <td>{report.ReportID}</td>
                                            <td>{report.ReportCatogery}</td>
                                            <td>{report.UploadedDate}</td>
                                            <td>{report.Amount}</td>
                                            <td>{report.Description}</td>
      
                                            <td>
                                                <Link to={`/update/${report._id}`} className='btn-success'>Update</Link>
                                                <button className='btn-success' onClick={(e) => handleDelete(report._id)}>Delete</button>
                                            </td>
                                        </tr>
                    ))
                        }
                    </tbody>
                </table>
            </div>
            </div>
            </div>
        
    );
}
export default Reports;