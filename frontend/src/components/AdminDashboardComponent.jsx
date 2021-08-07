import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import '../css/common.css';

export default function AdminDashboardComponent() {
    const [complaints, setComplaints] = useState([])
    const [complaintId, setComplaintId] = useState(0)
    const [complaintStatus, setComplaintStatus] = useState('')

    const updateComplaint = (e) => {
        let dataToSend = {
            complaintId: complaintId,
            status: complaintStatus,
            user_id: localStorage.getItem('user_id')
        }
        fetch('http://127.0.0.1:5000/update_complaint',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
          }).then(function(response) {
            return response.json();
          }).then(function(response) {
            window.location.href = '/admin-dashboard';
          });
    }

    const handleStatusChange = (e) => {
        setComplaintId(e.target.attributes.getNamedItem('data-attr').value)
        setComplaintStatus(e.target.value)
    }

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get_all_complaints')
          .then(resp => resp.json())
          .then(data => {
            setComplaints(data)
          })
      }, [setComplaints]);
    return(
        <div>
            {Object.keys(complaints).length > 0 && Object.entries(complaints).map(([id, status], index) => {
                return(
                    <Card key={id} style={{ width: "22rem" }}>
                        <Card.Body>
                          <Card.Title style={{ color: "green" }}>
                              <select data-attr={id} onChange={handleStatusChange} name="status" value={status}>
                                  <option value="pending_resolution">Pending Resolution</option>
                                  <option value="resolved">Resolved</option>
                                  <option value="dismissed">Dismessed</option>
                              </select>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                              {id}
                          </Card.Subtitle>
                          <Card.Text>
                            GeeksforGeeks provides a platform for all the students to study
                            about all the subjects in CSE.
                          </Card.Text>
                            <button onClick={updateComplaint}>Update</button>
                        </Card.Body>
                      </Card>
                )
            })
        }
        </div>
    )
}