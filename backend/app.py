from flask import Flask
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from db import db
from flask_cors import CORS
from user.views import register, login
from admin.views import admin_register, admin_login
from complaints.views import add_complaint, get_complaints, get_all_complaints, update_complaint
from flask_login import LoginManager
from user.models import User


app = Flask(__name__)
CORS(app)
app.secret_key = "secretkey"
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://samars:test1234@localhost/complaints_system'
db.init_app(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

login_manager = LoginManager()
login_manager.login_view = 'user.views.login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User


app.register_blueprint(register)
app.register_blueprint(login)
app.register_blueprint(admin_register)
app.register_blueprint(admin_login)
app.register_blueprint(add_complaint)
app.register_blueprint(get_complaints)
app.register_blueprint(get_all_complaints)
app.register_blueprint(update_complaint)


@app.route('/')
def index():
    return "Complaints System"


if __name__ == "__main__":
    app.run(debug=True)
