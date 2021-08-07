import React, {useState, useEffect} from "react";
import '../css/common.css';

export default function AddComplaintComponent() {
    const [categoty, setCategory] = useState('');
    const [contactedBefore, setContactedBefore] = useState(0);
    const [firstTime, setFirstTime] = useState(0);
    const [complaintBody, setComplaintBody] = useState('');

    const handleChangeCat = (e) => {
        setCategory(e.target.value)
    }

    const handleContactChange = (e) => {
        setContactedBefore(e.target.value)
    }

    const handleFirstTimeChange = (e) => {
        setFirstTime(e.target.value)
    }

    const handleComplaintChange = (e) => {
        setComplaintBody(e.target.value)
    }

    const submitComplaint = () => {
        let dataToSend = {
            category: categoty,
            contactedBefore: contactedBefore,
            firstTime: firstTime,
            complaintBody: complaintBody,
            user_id: localStorage.getItem('user_id')
        }
        fetch('http://127.0.0.1:5000/add_complaint',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
          }).then(function(response) {
            return response.json();
          }).then(function(response) {
            window.location.href = '/user-dashboard';
          });
    }

    return(
        <form onSubmit={submitComplaint}>
            <h3>Add Complaint</h3>

            <div className="form-group">
                <label>category</label>
                <select onChange={handleChangeCat} className="form-control" placeholder="category">
                    <option value="service">Service</option>
                    <option value="payment">Payment</option>
                    <option value="post_sales">Post Sales</option>
                </select>
            </div>

            <div className="form-group">
                <label>Have you contacted the team?</label>
                <input onChange={handleContactChange} name="contacted_before" type="radio" value="0"/>
                <label htmlFor="no">No</label>
                <input onChange={handleContactChange} name="contacted_before" type="radio" value="1"/>
                <label htmlFor="yes">Yes</label>
            </div>

            <div className="form-group">
                <label>Is this your first Complaint?</label>
                <input onChange={handleFirstTimeChange} name="first_time" type="radio" value="0"/>
                <label htmlFor="no">No</label>
                <input onChange={handleFirstTimeChange} name="first_time" type="radio" value="1"/>
                <label htmlFor="yes">Yes</label>
            </div>

            <div className="form-group">
                <label>Explain the complaint</label>
                <textarea class="form-control" onChange={handleComplaintChange} name="complaint_body" rows="4" cols="40"></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    )
}