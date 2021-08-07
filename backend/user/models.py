from db import db
from flask_login import UserMixin


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    created_at = db.Column(db.DateTime)

    def save(self):
        db.session.add(self)
        db.session.commit()
