from db import db
from flask_login import UserMixin


class AdminUser(UserMixin, db.Model):
    __tablename__ = 'admin_users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    permissions = db.Column(db.String(100))
    department = db.Column(db.String(100))
    created_at = db.Column(db.DateTime)

    def save(self):
        db.session.add(self)
        db.session.commit()