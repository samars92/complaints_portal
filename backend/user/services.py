from user.models import User


def validate_user(email):
    return User.query.filter_by(email=email).first()
