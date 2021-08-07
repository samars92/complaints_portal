from db import db
from sqlalchemy.orm import backref
from enum import Enum


class ComplaintStatus(Enum):
    pending_resolution = "Pending Resolution"
    resolved = "Resolved"
    dismissed = "Dismissed"


class Complaint(db.Model):
    __tablename__ = 'complaints'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    complaint_body = db.Column(db.Text)
    category = db.Column(db.String(100))
    contacted = db.Column(db.Boolean)
    status = db.Column(db.String(100))
    complaint_date = db.Column(db.DateTime)
    first_time = db.Column(db.Boolean)
    updated_by = db.Column(db.Integer, db.ForeignKey('admin_users.id'))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    def save(self):
        db.session.add(self)
        db.session.commit()
