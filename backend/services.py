from user.models import User
from admin.models import AdminUser


def validate_user(email):
    return User.query.filter_by(email=email).first()


def validate_admin_user(email):
    return AdminUser.query.filter_by(email=email).first()