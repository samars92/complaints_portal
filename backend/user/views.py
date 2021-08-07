from flask import Blueprint, session,abort, render_template
from flask import json, request, jsonify, Response
from flask_login import login_user
from user.models import User
from user.services import validate_user
from werkzeug.security import generate_password_hash, check_password_hash

register = Blueprint('register', __name__)
login = Blueprint('login', __name__)


@register.route('/register', methods=["POST"])
def register_user():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    if validate_user(email):
        return "already register"

    user = User(
        name=name,
        email=email,
        password=generate_password_hash(password, method='sha256')
    )

    user.save()
    session['user_id'] = user.id
    return json.dumps({'user_id': user.id}), 200


@login.route('/login', methods=["POST"])
def customer_login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    print("wwwwwww")
    print(email)
    print("wwwwwww")
    user = User.query.filter(User.email == email).first()
    print(user)
    if not user and check_password_hash(user.password, password):
        print("22222222222222")
        return json.dumps({'message': 'check login details'}), 400

    print("33333333333")
    login_user(user)
    session['user_id'] = user.id
    print("1111111111")
    return jsonify({'user_id': user.id}), 200


