from flask import Blueprint, session,abort, render_template
from flask import json, request
from flask_login import login_user
from admin.models import AdminUser
from user.services import validate_user
from werkzeug.security import generate_password_hash, check_password_hash

admin_register = Blueprint('admin_register', __name__)
admin_login = Blueprint('admin_login', __name__)


@admin_register.route('/admin_register', methods=["POST"])
def admin_signup():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']
    department = data['department']

    if validate_user(email):
        return "already register"

    admin_user = AdminUser(
        name=name,
        email=email,
        password=generate_password_hash(password, method='sha256'),
        department=department
    )

    admin_user.save()
    return {'user)id': admin_user.id}, 200


@admin_login.route('/admin_login', methods=["POST"])
def admin_signin():
    data = request.get_json()
    email = data['email']
    password = data['password']

    admin_user = AdminUser.query.filter(AdminUser.email == email).first()
    if not admin_user and check_password_hash(admin_user.password, password):
        return json.dumps({'message': 'check login details'}), 400

    login_user(admin_user)
    return {'user_id': admin_user.id}, 200
