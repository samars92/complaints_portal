import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import '../css/common.css';

export default function UserDashboardComponent() {
    const [complaints, setComplaints] = useState({})
    const user_id = localStorage.getItem('user_id')
    useEffect(() => {
        fetch('http://127.0.0.1:5000/'+user_id+'/get_complaints')
          .then(resp => resp.json())
          .then(data => {
            setComplaints(data)
          })
      }, [setComplaints]);
    console.log(complaints)
    return(
        <div>
            {Object.keys(complaints).length > 0 && Object.entries(complaints).map(([id, complaint], index) => {
                return(
                    <Card key={id} style={{ width: "22rem" }}>
                        <Card.Body>
                          <Card.Title style={{ color: "green" }}>{complaint.status}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                              {id}
                          </Card.Subtitle>
                          <Card.Text>
                              {complaint.body}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                )
            })
        }
        </div>
    )
}